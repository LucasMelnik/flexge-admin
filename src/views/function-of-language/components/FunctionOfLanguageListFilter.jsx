import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const FunctionOfLanguageListFilter = props => (
  <TextInput
    label="Search functions"
    placeholder="Start type to filter the functions of language"
    value={props.value}
    onChange={props.onChange}
  />
);

FunctionOfLanguageListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FunctionOfLanguageListFilter;
