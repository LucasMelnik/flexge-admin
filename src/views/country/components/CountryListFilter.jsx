import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CountryListFilter = props => (
  <TextInput
    label="Search countries"
    placeholder="Start type to filter the countries"
    value={props.value}
    onChange={props.onChange}
  />
);

CountryListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CountryListFilter;
