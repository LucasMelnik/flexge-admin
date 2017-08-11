import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import IconButton from './IconButton';
import Async from '../layout/Async';
import ErrorText from '../layout/ErrorText';
import AudioPreview from '../layout/AudioPreview';
import ImagePreview from '../layout/ImagePreview';
import VideoPreview from '../layout/VideoPreview';
import ColumnSeparator from '../layout/ColumnSeparator';

export default class FileInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
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
    disabled: false,
  };

  state = { uploading: false };

  handleChange = (event) => {
    const fileData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.setState({
      uploading: true,
    });

    axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/files`,
      headers: {
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
      data: fileData,
    }).then((response) => {
      this.setState({
        uploading: false,
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
    const hasValue = (this.props.value && !this.state.uploading);
    return (
      <div
        style={{
          width: this.props.fullWidth ? '100%' : '220px',
          height: 85,
          position: 'relative',
        }}
      >
        <label>{this.props.label}</label>
        <Async
          size="sm"
          fetching={this.state.uploading}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '100%',
            }}
          >
            {!this.state.uploading && (
              <IconButton
                tooltip="Select a file"
                disabled={this.props.disabled}
                onClick={() => this.fileInput.click()}
                icon="fa-upload"
              />
            )}
            <ColumnSeparator />
            {hasValue && (
              <IconButton
                tooltip="Delete the file"
                disabled={this.props.disabled}
                onClick={this.handleDelete}
                icon="fa-trash"
              />
            )}
            <ColumnSeparator />
            {(this.props.accept === 'audio' && hasValue) && (
              <AudioPreview src={this.props.value} />
            )}
            {(this.props.accept === 'image' && hasValue) && (
              <ImagePreview src={this.props.value} />
            )}
            {(this.props.accept === 'video' && hasValue) && (
              <VideoPreview src={this.props.value} />
            )}
          </div>
        </Async>
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
      </div>
    );
  }
}
