import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';

export default class SchoolClassFileImport extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  handleChange = (event) => {
    this.props.onChange(event.target.files[0]);
  };

  render() {
    return (
      <div
        style={{
          display: 'inline',
        }}
      >
        <Button
          label={this.props.label}
          disabled={this.props.disabled}
          onClick={() => this.fileInput.click()}
          icon="fa-upload"
        />
        <input
          type="file"
          style={{
            visibility: 'hidden',
            width: 0,
            height: 0,
          }}
          onChange={this.handleChange}
          ref={input => { this.fileInput = input; }}
          accept="xlsx/*"
        />
      </div>
    );
  }
}
