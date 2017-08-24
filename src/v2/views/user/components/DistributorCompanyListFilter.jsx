import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const DistributorCompanyListFilter = props => (
  <TextInput
    label="Search companies"
    placeholder="Start type to filter the companies"
    value={props.value}
    onChange={props.onChange}
  />
);

DistributorCompanyListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DistributorCompanyListFilter;
