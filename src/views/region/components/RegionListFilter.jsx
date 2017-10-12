import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const RegionListFilter = props => (
  <TextInput
    label="Search regions"
    placeholder="Start type to filter the regions"
    value={props.value}
    onChange={props.onChange}
  />
);

RegionListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RegionListFilter;
