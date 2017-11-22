import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const ListFilter = props => (
  <TextInput
    label={props.label}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
);

ListFilter.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ListFilter;
