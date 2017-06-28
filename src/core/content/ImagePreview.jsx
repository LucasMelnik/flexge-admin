import React, { Component } from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import Flex from 'jsxstyle/Flex';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import Modal from '../layout/Modal';
import Button from '../form/Button';

export default class ImagePreview extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = { isOpen: false, loading: true };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      loading: true,
    });
  };

  handleLoad = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <InlineBlock>
        <IconButton
          iconClassName="material-icons"
          tooltip="Image Preview"
          onClick={this.toggleModal}
          style={{
            width: 36,
            height: 36,
            padding: 0,
          }}
        >
          photo_library
        </IconButton>
        <Modal
          isOpen={this.state.isOpen}
          title="Image Preview"
        >
          {this.state.loading && (
            <Flex
              justifyContent="center"
              marginTop="10px"
            >
              <CircularProgress size={60} />
            </Flex>
          )}
          <img
            src={this.props.src}
            onLoad={this.handleLoad}
            width="100%"
            alt=""
          />
          <Button
            label="Close"
            onClick={this.toggleModal}
            style={{
              float: 'right',
            }}
          />
        </Modal>
      </InlineBlock>
    );
  }
}