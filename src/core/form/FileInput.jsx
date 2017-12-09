import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form } from 'antd';
import Button from './Button';
import AudioPreview from '../layout/AudioPreview';
import ImagePreview from '../layout/ImagePreview';

export default class FileInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    accept: PropTypes.oneOf([
      'audio',
      'image',
    ]),
  };

  static defaultProps = {
    accept: 'audio',
    errorText: null,
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
      <Form.Item
        colon={false}
        label={this.props.label}
        help={this.props.errorText}
        validateStatus={this.props.errorText && 'error'}
      >
        <div
          style={{
            display: 'inline-block',
          }}
        >
          {(!this.props.disabled) && (
            <Button
              label={!this.state.uploading && 'Select a file'}
              loading={this.state.uploading}
              disabled={this.props.disabled}
              onClick={() => this.fileInput.click()}
              icon="upload"
            />
          )}
          {' '}
          {(hasValue && !this.props.disabled) && (
            <Button
              tooltip="Delete the file"
              disabled={this.props.disabled}
              onClick={this.handleDelete}
              icon="delete"
            />
          )}
          {' '}
          {(this.props.accept === 'audio' && hasValue) && (
            <AudioPreview src={this.props.value} />
          )}
          {(this.props.accept === 'image' && hasValue) && (
            <ImagePreview src={this.props.value} />
          )}
        </div>
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
      </Form.Item>
    );
  }
}
