import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Select = props => (
  <SelectField
    floatingLabelText={props.label}
    fullWidth={props.fullWidth}
    multiple={props.multiple}
    value={props.value}
    disabled={props.disabled}
    onChange={(e, key, payload) => props.onChange(payload)}
    errorText={props.errorText}
  >
    {props.options.map(option => (
      <MenuItem
        key={`${option.value}-${option.label}`}
        value={option.value}
        primaryText={option.label}
      />
    ))}
  </SelectField>
);

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  })).isRequired,
  multiple: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
};

Select.defaultProps = {
  value: null,
  errorText: null,
  fullWidth: false,
  multiple: false,
  disabled: false,
  onChange: null,
};

export default Select;
