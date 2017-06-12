import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const ModuleListFilter = props => (
  <Paper
    flexible
  >
    <TextInput
      label="Search modules"
      value={props.value}
      onChange={props.onChange}
    />
  </Paper>
);

ModuleListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModuleListFilter;
