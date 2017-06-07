import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const StudentListFilter = props => (
  <Card
    flexible
  >
    <TextInput
      label="Search students"
      value={props.value}
      onChange={props.onChange}
    />
  </Card>
);

StudentListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StudentListFilter;
