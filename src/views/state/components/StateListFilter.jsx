import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const StateListFilter = props => (
  <TextInput
    label="Search states"
    placeholder="Start type to filter the states"
    value={props.value}
    onChange={props.onChange}
  />
);

StateListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StateListFilter;
