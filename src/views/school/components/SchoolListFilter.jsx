import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const SchoolListFilter = props => (
  <TextInput
    label="Search schools"
    placeholder="Start type to filter the schools"
    value={props.value}
    onChange={props.onChange}
  />
);

SchoolListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolListFilter;
