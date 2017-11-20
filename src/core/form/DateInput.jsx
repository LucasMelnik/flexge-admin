import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';

const DateInput = props =>  (
  <DatePicker
    value={moment(props.value)}
    onChange={props.onChange}
    format={props.format}
    placeholder={props.placeholder}
    disabled={props.disabled}
  />
);

DateInput.propTypes = {
  format: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

DateInput.defaultProps = {
  format: 'DD/MM/YYYY',
  value: null,
  placeholder: null,
  disabled: false,
  onChange: () => false,
};

export default  DateInput;
