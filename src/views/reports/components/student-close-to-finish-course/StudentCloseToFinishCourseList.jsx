import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import { formatTimeFromSeconds } from '../../../../core/util';
import { browserHistory } from 'react-router';
import Button from '../../../../core/form/Button';

const StudentCloseToFinishCourseList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      ...[
        {
          label: 'Complete %',
          path: 'percentageComplete',
          width: '120px',
          sort: true,
          render: value => `${value.toFixed(1)}%`,
        },
        {
          label: 'Studied Time',
          path: 'studiedTime',
          width: '100px',
          render: value => formatTimeFromSeconds(value || 0, 'hh:mm'),
        },
        {
          label: 'Course',
          path: 'studentCourse.course.name',
          width: '65px',
        },
        {
          label: 'Need CT',
          path: 'studentCourse.course.needCertification',
          width: '80px',
          render: value => value ? 'Yes' : 'No',
        },
        {
          label: 'Student',
          path: 'name',
        },
        {
          label: 'Classroom',
          path: 'schoolClass.name',
        },
      ],
      ...localStorage.role !== 'TEACHER' && [
        {
          label: 'Teacher',
          path: 'schoolClass.teacher.name',
        },
      ],
      ...(localStorage.role !== 'TEACHER' && localStorage.role !== 'SCHOOL_MANAGER') && [
        {
          label: 'School',
          path: 'schoolClass.school.name',
        },
      ],
      ...[
        {
          label: 'Actions',
          patch: 'action',
          width: '75px',
          render: (value, row) => (
            <Button
              icon="folder-open"
              onClick={() => browserHistory.push(`/records/schools/${row.schoolClass.school.id}/classes/${row.schoolClass.id}/students/${row.id}/detail`)}
            />
          )
        },
      ],
    ]}
    rows={props.students}
  />
);

StudentCloseToFinishCourseList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentCloseToFinishCourseList;
