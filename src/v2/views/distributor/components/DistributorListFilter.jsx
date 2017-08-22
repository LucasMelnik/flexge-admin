import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const DistributorListFilter = props => (
  <TextInput
    label="Search distributors"
    placeholder="Start type to filter the distributors"
    value={props.value}
    onChange={props.onChange}
  />
);

DistributorListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DistributorListFilter;
