import React from 'react';
import PropTypes from 'prop-types';
import MaterialDatePicker from 'material-ui/DatePicker';

const DatePicker = props => (
  <MaterialDatePicker
    floatingLabelText={props.label}
    fullWidth={props.fullWidth}
    onChange={(e, date) => props.onChange(date)}
    value={props.value}
    errorText={props.errorText}
    disabled={props.disabled}
  />
);

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  errorText: PropTypes.string,
};

DatePicker.defaultProps = {
  fullWidth: false,
  disabled: false,
  value: null,
  errorText: null,
};

export default DatePicker;
