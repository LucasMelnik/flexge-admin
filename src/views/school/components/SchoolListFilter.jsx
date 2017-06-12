import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const SchoolListFilter = props => (
  <Paper>
    <TextInput
      label="Search schools"
      value={props.value}
      onChange={props.onChange}
    />
  </Paper>
);

SchoolListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolListFilter;
