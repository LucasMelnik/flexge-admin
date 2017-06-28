import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Flex from 'jsxstyle/Flex';
import Block from 'jsxstyle/Block';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import ErrorText from '../content/ErrorText';
import AudioPreview from '../content/AudioPreview';
import ImagePreview from '../content/ImagePreview';
import Label from '../content/Label';
import VideoPreview from '../content/VideoPreview';

export default class FileInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    errorText: PropTypes.string,
    fullWidth: PropTypes.bool,
    accept: PropTypes.oneOf([
      'audio',
      'video',
      'image',
    ]),
  };

  static defaultProps = {
    accept: 'audio',
    errorText: null,
    fullWidth: false,
  };

  state = { uploadPercentage: 0 }

  handleChange = (event) => {
    const fileData = new FormData();
    fileData.append('file', event.target.files[0]);

    axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/files`,
      headers: {
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
      data: fileData,
      onUploadProgress: (progressEvent) => {
        this.setState({
          uploadPercentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
        });
      }
    }).then((response) => {
      this.setState({
        uploadPercentage: 0,
      });
      this.props.onChange(response.data.key);
    });
  };

  handleDelete = () => {
    if (this.props.value.indexOf('temp') >= 0) {
      axios.request({
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}/files/${this.props.value.split('/').pop()}`,
        headers: {
          ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
        },
      }).then(() => {
        this.props.onChange(null);
      });
    } else {
      this.props.onChange(null);
    }
  };

  render() {
    const hasValue = (this.props.value && this.state.uploadPercentage === 0);
    return (
      <Block
        width={this.props.fullWidth ? '100%' : '220px'}
        height="55px"
        position="relative"
      >
        <Label>{this.props.label}</Label>
        <Flex
          alignItems="flex-end"
          height="100%"
        >
          {this.state.uploadPercentage === 0 && (
            <IconButton
              iconClassName="material-icons"
              tooltip="Select a file"
              onClick={() => this.fileInput.click()}
              style={{
              width: 36,
              height: 36,
              padding: 0,
            }}
            >
              file_upload
            </IconButton>
          )}
          {hasValue && (
            <IconButton
              iconClassName="material-icons"
              tooltip="Delete the file"
              onClick={this.handleDelete}
              style={{
                width: 36,
                height: 36,
                padding: 0,
              }}
            >
              delete
            </IconButton>
          )}
          {this.state.uploadPercentage > 0 && (
            <LinearProgress
              mode="determinate"
              value={this.state.uploadPercentage}
            />
          )}
          {(this.props.accept === 'audio' && hasValue) && (
            <AudioPreview src={`${process.env.REACT_APP_API_URL}/files/${this.props.value}`} />
          )}
          {(this.props.accept === 'image' && hasValue) && (
            <ImagePreview src={`${process.env.REACT_APP_API_URL}/files/${this.props.value}`} />
          )}
          {(this.props.accept === 'video' && hasValue) && (
            <VideoPreview src={`${process.env.REACT_APP_API_URL}/files/${this.props.value}`} />
          )}
        </Flex>
        {this.props.errorText && (
          <ErrorText>
            {this.props.errorText}
          </ErrorText>
        )}
        <input
          type="file"
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
          }}
          onChange={this.handleChange}
          ref={input => { this.fileInput = input; }}
          accept={`${this.props.accept}/*`}
        />
      </Block>
    );
  }
}
