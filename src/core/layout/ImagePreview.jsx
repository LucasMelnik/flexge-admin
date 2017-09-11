import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../layout/Dialog';
import Button from '../form/Button';
import IconButton from '../form/IconButton';

export default class ImagePreview extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = { isOpen: false };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
        }}
      >
        <IconButton
          tooltip="Image Preview"
          onClick={this.toggleModal}
          icon="fa-picture-o"
        />
        <Dialog
          isOpen={this.state.isOpen}
          title="Image Preview"
          actions={[
            <Button
              key="closeButton"
              icon="fa-times"
              label="Close"
              onClick={this.toggleModal}
            />,
          ]}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}/files/${this.props.src}`}
            width="100%"
            alt=""
          />
        </Dialog>
      </div>
    );
  }
}