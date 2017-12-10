import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../../../../core/form/AutoComplete';

const StudentRecordSelect = props => (
  <AutoComplete
    placeholder="Search the student"
    labelPath="name"
    value={props.value}
    onSelect={props.onSelect}
    onChange={props.onChange}
    dataSource={props.dataSource}
  />
);

StudentRecordSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default StudentRecordSelect;
