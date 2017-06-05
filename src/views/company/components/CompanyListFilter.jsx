import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const CompanyListFilter = props => (
  <Card>
    <TextInput
      label="Search companies"
      value={props.value}
      onChange={props.onChange}
    />
  </Card>
);

CompanyListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CompanyListFilter;
