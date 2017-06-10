import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';

const CompanyListFilter = props => (
  <Paper>
    <TextInput
      label="Search companies"
      value={props.value}
      onChange={props.onChange}
    />
  </Paper>
);

CompanyListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CompanyListFilter;
