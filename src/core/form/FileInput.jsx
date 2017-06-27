import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import LinearProgress from 'material-ui/LinearProgress';
import Button from './Button';

export default class FileInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    accept: PropTypes.oneOf([
      'audio/*',
      'video/*',
      'image/*',
    ]),
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
          uploadPercentage: Math.round( (progressEvent.loaded * 100) / progressEvent.total ),
        });
      }
    }).then((response) => {
      this.setState({
        uploadPercentage: 0,
      });
      this.props.onChange(response.data.key);
    });
  };

  render() {
    return (
      <div>
        {!this.state.uploadPercentage && (
          <Button
            label={this.props.value ? 'Change File' : 'Choose File'}
            onClick={() => this.fileInput.click()}
          />
        )}
        {this.state.uploadPercentage && (
          <LinearProgress
            mode="determinate"
            value={this.state.uploadPercentage}
          />
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
          accept={this.props.accept}
        />
      </div>
    )
  }
}
