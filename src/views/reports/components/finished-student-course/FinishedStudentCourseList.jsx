import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import { formatTimeFromSeconds } from '../../../../core/util';

const FinishedStudentCourseList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Completed at',
        path: 'studentCourse.completedAt',
        width: '140px',
        sort: true,
        render: value => moment(value).format('DD/MM/YYYY HH:mm')
      },
      {
        label: 'Course',
        path: 'studentCourse.course.name',
        width: '65px',
      },
      {
        label: 'Student',
        path: 'name',
      },
      {
        label: 'Classroom',
        path: 'schoolClass.name',
      },
      {
        label: 'School',
        path: 'schoolClass.school.name',
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        width: '100px',
        render: value => formatTimeFromSeconds(value || 0, 'hh:mm'),
      },
    ]}
    rows={props.students}
  />
);

FinishedStudentCourseList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default FinishedStudentCourseList;
