import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';

const StudentAutoComplete = props => (
  <AutoComplete
    label="Student"
    labelPath="name"
    accessoryLabelPath="email"
    value={props.value}
    disabled={props.disabled}
    required={props.required}
    onSelect={props.onSelect}
    onChange={props.onChange}
    dataSource={props.dataSource}
  />
);

StudentAutoComplete.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentAutoComplete;
