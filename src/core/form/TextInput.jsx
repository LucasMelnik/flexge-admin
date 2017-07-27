import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const TextInput = props => (
  <TextField
    floatingLabelText={props.label}
    errorText={props.errorText}
    value={props.value}
    onChange={e => props.onChange && props.onChange(e.target.value)}
    fullWidth={props.fullWidth}
    disabled={props.disabled}
    type={props.type}
    max={props.max}
    step={props.step}
    multiLine={props.multiLine}
    rows={props.multiLine ? props.rows : 1}
    rowsMax={props.multiLine ? props.rowsMax : 1}
  />
);

TextInput.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  errorText: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  max: PropTypes.number,
  value: PropTypes.any,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  step: PropTypes.number,
  multiLine: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
};

TextInput.defaultProps = {
  value: '',
  label: null,
  max: null,
  errorText: null,
  fullWidth: false,
  disabled: false,
  onChange: null,
  type: 'text',
  step: 0.01,
  multiLine: false,
  rows: 2,
  rowsMax: 4,
};

export default TextInput;
