import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

const TextInput = (props) => (
  <Form.Item
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
  >
    {(props.fieldType === 'textarea') ? (
      <Input.TextArea
        cols="5"
        rows={props.textAreaRows}
        disabled={props.disabled}
        value={props.value}
        onChange={e => props.onChange && props.onChange(e.target.value)}
        placeholder={props.placeholder}
        style={{
          overflow: 'auto',
          wordWrap: 'break-word',
          resize: 'none',
        }}
      />
    ) : (
      <Input
        type={props.type}
        value={props.value}
        onChange={e => props.onChange && props.onChange(e.target.value)}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
    )}
  </Form.Item>
);

TextInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'number']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fieldType: PropTypes.oneOf(['textarea', 'input']),
  errorText: PropTypes.string,
  textAreaRows: PropTypes.string,
};

TextInput.defaultProps = {
  onChange: null,
  onFocus: null,
  value: '',
  placeholder: null,
  type: 'text',
  disabled: false,
  fieldType: 'input',
  errorText: null,
  textAreaRows: '2',
};

export default TextInput;
