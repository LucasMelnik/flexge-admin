import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, Form } from 'antd';

const DateInput = props =>  (
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
    <DatePicker
      value={props.value && moment(props.value)}
      onChange={props.onChange}
      format={props.format}
      showTime={props.showTime}
      placeholder={props.placeholder}
      disabled={props.disabled}
      disabledDate={props.disabledDate}
      style={{
        width: '100%',
      }}
    />
  </Form.Item>
);

DateInput.propTypes = {
  format: PropTypes.string,
  errorText: PropTypes.string,
  showTime: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.objectOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabledDate: PropTypes.func,
};

DateInput.defaultProps = {
  format: 'DD/MM/YYYY',
  errorText: null,
  showTime: false,
  value: null,
  placeholder: null,
  disabled: false,
  required: false,
  disabledDate: null,
};

export default DateInput;
