import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const GrammarListFilter = props => (
  <TextInput
    label="Search countries"
    placeholder="Start type to filter the countries"
    value={props.value}
    onChange={props.onChange}
  />
);

GrammarListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GrammarListFilter;
