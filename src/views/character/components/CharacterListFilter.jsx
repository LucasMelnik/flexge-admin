import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CharacterListFilter = props => (
  <TextInput
    label="Search characters"
    placeholder="Start type to filter the characters"
    value={props.value}
    onChange={props.onChange}
  />
);

CharacterListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CharacterListFilter;
