import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const StudentListFilter = props => (
  <Paper>
    <TextInput
      label="Search students"
      value={props.value}
      onChange={props.onChange}
    />
  </Paper>
);

StudentListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StudentListFilter;
