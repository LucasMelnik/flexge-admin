import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

const LocaleSelect = props => (
  <Select
    label="Locale"
    required={props.required}
    disabled={props.disabled}
    value={props.value}
    onChange={props.onChange}
    errorText={props.errorText}
    options={['en', 'pt-br', 'es'].map(locale => ({
      label: locale,
      value: locale,
    }))}
  />
);

LocaleSelect.propTypes = {
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

LocaleSelect.defaultProps = {
  disabled: false,
  required: false,
  value: null,
  errorText: null,
};


export default LocaleSelect;
