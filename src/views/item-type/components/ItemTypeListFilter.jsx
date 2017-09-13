import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const ItemTypeListFilter = props => (
  <TextInput
    label="Search items type"
    placeholder="Start type to filter the items"
    value={props.value}
    onChange={props.onChange}
  />
);

ItemTypeListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ItemTypeListFilter;
