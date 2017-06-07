import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';

const TeacherListFilter = props => (
  <Card>
    <TextInput
      label="Search for teachers"
      value={props.value}
      onChange={props.onChange}
    />
  </Card>
);

TeacherListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TeacherListFilter;
