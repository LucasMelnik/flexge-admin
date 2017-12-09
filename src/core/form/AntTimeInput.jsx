import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimePicker, Form } from 'antd';

const AntTimeInput = props => (
  <Form.Item
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
    style={{
      width: '100%',
    }}
  >
    <TimePicker
      value={props.value && moment(props.value)}
      onChange={props.onChange}
      format={props.format}
      minutesStep={15}
      placeholder={props.placeholder}
      disabled={props.disabled}
      style={{
        width: '100%',
      }}
    />
  </Form.Item>
);

AntTimeInput.propTypes = {
  format: PropTypes.string,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.objectOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

AntTimeInput.defaultProps = {
  format: 'HH:mm',
  errorText: null,
  value: null,
  placeholder: null,
  disabled: false,
};

export default AntTimeInput;
