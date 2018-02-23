import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, Form } from 'antd';

const MonthInput = props =>  (
  <Form.Item
    colon={false}
    required={props.required}
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
    style={{
      width: '100%',
    }}
  >
    <DatePicker.MonthPicker
      value={props.value && moment(props.value)}
      onChange={props.onChange}
      format={props.format}
      placeholder={props.placeholder}
      disabled={props.disabled}
      style={{
        width: '100%',
      }}
    />
  </Form.Item>
);

MonthInput.propTypes = {
  format: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.objectOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

MonthInput.defaultProps = {
  format: 'MM/YYYY',
  errorText: null,
  value: null,
  placeholder: null,
  disabled: false,
  required: false,
};

export default MonthInput;
