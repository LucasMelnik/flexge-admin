import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'antd';

export default class FileInput extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
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

  render() {
    return (
      <Button
        onClick={() => this.fileInput.click()}
        icon={this.state.uploading ? 'loading' : 'upload'}
      >
        <input
          type="file"
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
            position: 'absolute',
            top: 0,
          }}
          onChange={this.handleChange}
          ref={(input) => { this.fileInput = input; }}
          accept="audio/*"
        />
      </Button>
    );
  }
}