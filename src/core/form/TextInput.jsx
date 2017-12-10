import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

class TextInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onFocus: PropTypes.func,
    type: PropTypes.oneOf(['text', 'password', 'number']),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    fieldType: PropTypes.oneOf(['textarea', 'input']),
    errorText: PropTypes.string,
    textAreaRows: PropTypes.string,
  };

  static defaultProps = {
    onFocus: null,
    value: '',
    placeholder: null,
    type: 'text',
    disabled: false,
    required: false,
    fieldType: 'input',
    errorText: null,
    textAreaRows: '2',
    onChange: () => false,
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
        {(this.props.fieldType === 'textarea') ? (
          <Input.TextArea
            cols="5"
            rows={this.props.textAreaRows}
            disabled={this.props.disabled}
            value={this.props.value}
            onChange={e => this.props.onChange && this.props.onChange(e.target.value)}
            placeholder={this.props.placeholder}
            style={{
              overflow: 'auto',
              wordWrap: 'break-word',
              resize: 'none',
            }}
          />
        ) : (
          <Input
            type={this.props.type}
            value={this.props.value}
            onChange={e => this.props.onChange && this.props.onChange(e.target.value)}
            onFocus={this.props.onFocus}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
          />
        )}
      </Form.Item>
    );
  }
}

export default TextInput;
