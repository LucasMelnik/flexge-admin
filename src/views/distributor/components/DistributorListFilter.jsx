import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const DistributorListFilter = props => (
  <Paper>
    <TextInput
      label="Search distributors"
      value={props.value}
      onchange={props.onChange}
    />
  </Paper>
);

DistributorListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DistributorListFilter;
