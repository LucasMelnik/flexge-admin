import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const UserAdminListFilter = props => (
  <TextInput
    label="Search admin users"
    placeholder="Start type to filter the users"
    value={props.value}
    onChange={props.onChange}
  />
);

UserAdminListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserAdminListFilter;
