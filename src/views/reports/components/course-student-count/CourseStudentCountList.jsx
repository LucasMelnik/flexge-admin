import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const CourseStudentCountList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Course',
        path: 'name',
        width: '100px',
        sort: true,
      },
      {
        label: 'Student count',
        path: 'count',
        sort: true,
        defaultSortOrder: 'desc',
      },
    ]}
    rows={props.courses}
  />
);

CourseStudentCountList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CourseStudentCountList;
