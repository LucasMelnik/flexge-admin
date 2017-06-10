import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const DistributorListFilter = props => (
  <Card>
    <TextInput
      label="Search distributors"
      value={props.value}
      onchange={props.onChange}
    />
  </Card>
);

DistributorListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DistributorListFilter;
