import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';

const Switch = props => (
  <Toggle
    toggled={props.toggled}
    label={props.label}
    onToggle={(event, isInputChecked) => props.onChange(isInputChecked)}
    disabled={props.disabled}
    labelStyle={{
      width: 'auto',
    }}
    style={props.style}
  />
);

Switch.propTypes = {
  toggled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Switch.defaultProps = {
  disabled: false,
  style: null,
};

export default Switch;
