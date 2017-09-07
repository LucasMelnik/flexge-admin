import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const CourseListFilter = props => (
  <TextInput
    label="Search courses"
    placeholder="Start type to filter the courses"
    value={props.value}
    onChange={props.onChange}
  />
);

CourseListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CourseListFilter;
