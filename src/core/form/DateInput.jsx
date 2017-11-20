import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, Form } from 'antd';

const DateInput = props =>  (
  <Form.Item
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
  >
    <DatePicker
      value={moment(props.value)}
      onChange={props.onChange}
      format={props.format}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  </Form.Item>
);

DateInput.propTypes = {
  format: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  format: 'DD/MM/YYYY',
  errorText: null,
  value: null,
  placeholder: null,
  disabled: false,
};

export default DateInput;
