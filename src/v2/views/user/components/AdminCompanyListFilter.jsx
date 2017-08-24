import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const AdminCompanyListFilter = props => (
  <TextInput
    label="Search companies"
    placeholder="Start type to filter the companies"
    value={props.value}
    onChange={props.onChange}
  />
);

AdminCompanyListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AdminCompanyListFilter;
