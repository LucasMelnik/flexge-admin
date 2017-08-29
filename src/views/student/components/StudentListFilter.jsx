import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const StudentListFilter = props => (
  <TextInput
    label="Search student"
    placeholder="Start type to filter the student"
    value={props.value}
    onChange={props.onChange}
  />
);

StudentListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StudentListFilter;
