import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../../../core/form/AutoComplete';

const StudentSelect = props => (
  <AutoComplete
    label="Student"
    labelPath="name"
    value={props.value}
    disabled={props.disabled}
    onSelect={props.onSelect}
    onChange={props.onChange}
    dataSource={props.dataSource}
  />
);

StudentSelect.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentSelect;
