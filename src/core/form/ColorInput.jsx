import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { ChromePicker } from 'react-color';

class ColorInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    disabled: false,
    required: false,
    errorText: null,
    onChange: () => false,
  };

  handleChangeComplete = (color) => {
    if (this.props.onChange) {
      this.props.onChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
    }
  };

  render() {
    return (
      <Form.Item
        required={this.props.required}
        colon={false}
        label={this.props.label}
        help={this.props.errorText}
        validateStatus={this.props.errorText && 'error'}
      >
        <ChromePicker
          color={this.props.value}
          onChangeComplete={this.handleChangeComplete}
        />
      </Form.Item>
    );
  }
}

export default ColorInput;
