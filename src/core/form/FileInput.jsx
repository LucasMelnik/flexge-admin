import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Block from 'jsxstyle/Block';
import LinearProgress from 'material-ui/LinearProgress';
import Button from './Button';
import ErrorText from "../content/ErrorText";

export default class FileInput extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
      <Block
        width={this.props.fullWidth ? '100%' : '165px'}
      >
        {this.state.uploadPercentage === 0 && (
          <Button
            label={this.props.value ? `Change the ${this.props.accept}` : `Choose the ${this.props.accept}`}
            onClick={() => this.fileInput.click()}
          />
        )}
        {this.state.uploadPercentage > 0 && (
          <LinearProgress
            mode="determinate"
            value={this.state.uploadPercentage}
          />
        )}
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
