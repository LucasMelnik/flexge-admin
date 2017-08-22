import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const SchoolClassListFilter = props => (
  <TextInput
    label="Search school classes"
    placeholder="Start type to filter the school classes"
    value={props.value}
    onChange={props.onChange}
  />
);

SchoolClassListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolClassListFilter;
