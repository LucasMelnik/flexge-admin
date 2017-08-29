import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../layout/Dialog';
import Button from '../form/Button';
import IconButton from '../form/IconButton';
import Async from './Async';

export default class VideoPreview extends Component {

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

  handleCanPlay = () => {
    this.setState({
      loading: false,
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
          tooltip="Video Preview"
          onClick={this.toggleModal}
          icon="fa-video-camera"
        />
        <Dialog
          isOpen={this.state.isOpen}
          title="Video Preview"
          actions={[
            <Button
              icon="fa-times"
              label="Close"
              onClick={this.toggleModal}
            />,
          ]}
        >
          <Async fetching={this.state.loading}>
            <video
              src={`${process.env.REACT_APP_API_URL}/files/${this.props.src}`}
              muted={false}
              controls
              preload="none"
              autoPlay
              onCanPlayThrough={this.handleCanPlay}
              style={{
                display: 'block',
                height: 'auto',
                width: this.state.loading ? 0 : 550,
                visibility: this.state.loading ? 'hidden' : 'visible',
              }}
            />
          </Async>
        </Dialog>
      </div>
    );
  }
}