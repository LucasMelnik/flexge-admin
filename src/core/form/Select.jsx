import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntSelect, Form } from 'antd';

const Select = props => (
  <Form.Item
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
  >
    <AntSelect
      allowClear
      style={{
        width: '100%',
      }}
      placeholder={props.placeholder}
      disabled={props.disabled}
      value={props.value}
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
    value: PropTypes.oneOfType([PropTypes.string]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string]),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  value: null,
  errorText: null,
  placeholder: '',
};

export default Select;
