import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect, Form } from 'antd';

const Select = props => (
  <Form.Item
    colon={false}
    required={props.required}
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
    style={{
      minWidth: 200,
    }}
  >
    <AntSelect
      allowClear
      style={{
        width: '100%',
      }}
      placeholder={props.placeholder}
      disabled={props.disabled}
      value={props.value || undefined}
      onChange={value => props.onChange && props.onChange(value)}
    >
      {props.options.map(option => (
        <AntSelect.Option
          key={`option-${option.value}`}
          value={option.value}
        >
          {option.label}
        </AntSelect.Option>
      ))}
    </AntSelect>
  </Form.Item>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  required: false,
  value: null,
  errorText: null,
  placeholder: '',
};

export default Select;
