import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const TeacherListFilter = props => (
  <Paper>
    <TextInput
      label="Search for teachers"
      value={props.value}
      onChange={props.onChange}
    />
  </Paper>
);

TeacherListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TeacherListFilter;
