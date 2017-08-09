import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CompanyListFilter = props => (
  <div>
    <TextInput
      label="Search companies"
      value={props.value}
      onChange={props.onChange}
    />
  </div>
);

CompanyListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CompanyListFilter;
