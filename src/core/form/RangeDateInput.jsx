import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';

const RangeDateInput = props =>  (
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
    <DatePicker.RangePicker
      ranges={props.ranges}
      allowClear={props.allowClear}
      value={props.value}
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

RangeDateInput.propTypes = {
  ranges: PropTypes.shape({}),
  format: PropTypes.string,
  errorText: PropTypes.string,
  showTime: PropTypes.bool,
  allowClear: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.array,
  placeholder: PropTypes.array,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabledDate: PropTypes.func,
};

RangeDateInput.defaultProps = {
  format: 'DD/MM/YYYY',
  ranges: null,
  errorText: null,
  showTime: false,
  allowClear: true,
  value: [],
  placeholder: [],
  disabled: false,
  required: false,
  disabledDate: null,
};

export default RangeDateInput;
