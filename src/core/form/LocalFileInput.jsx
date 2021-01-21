import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Button from './Button';
import AudioPreview from '../layout/AudioPreview';
import ImagePreview from '../layout/ImagePreview';

export default class LocalFileInput extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    accept: PropTypes.oneOf([
      'audio',
      'image',
      'video',
    ]),
  };

  static defaultProps = {
    accept: 'audio',
    value: null,
    errorText: null,
    disabled: false,
  };

  handleChange = (event) => {
    this.props.onChange(event.target.files[0]);
  };

  render() {
    const hasValue = (!!this.props.value);
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
              label={'Select a file'}
              onClick={() => this.fileInput.click()}
              icon="upload"
            />
          )}
          {' '}
          {(this.props.accept === 'audio' && hasValue) && (
            <AudioPreview src={this.props.value}/>
          )}
          {(this.props.accept === 'image' && hasValue) && (
            <ImagePreview src={this.props.value}/>
          )}
          {(this.props.accept === 'video' && hasValue) && (
            <span>{this.props.value.name}</span>
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
          ref={input => {
            this.fileInput = input;
          }}
          accept={`${this.props.accept}/*`}
        />
      </Form.Item>
    );
  }
}
