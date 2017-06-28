import React, { Component } from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import Flex from 'jsxstyle/Flex';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import Modal from '../layout/Modal';
import Button from '../form/Button';
import Separator from '../layout/Separator';

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
      <InlineBlock>
        <IconButton
          iconClassName="material-icons"
          tooltip="Video Preview"
          onClick={this.toggleModal}
          style={{
            width: 36,
            height: 36,
            padding: 0,
          }}
        >
          video_library
        </IconButton>
        <Modal
          isOpen={this.state.isOpen}
          title="Video Preview"
        >
          {this.state.loading && (
            <Flex
              justifyContent="center"
              marginTop="10px"
            >
              <CircularProgress size={60} />
            </Flex>
          )}
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
          <Separator size="xs" />
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