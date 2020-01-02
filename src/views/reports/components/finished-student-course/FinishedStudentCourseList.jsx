import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import { formatTimeFromSeconds } from '../../../../core/util';
import Button from '../../../../core/form/Button';

const FinishedStudentCourseList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Completed at',
        path: 'studentCourse.completedAt',
        width: '140px',
        sort: true,
        defaultSortOrder: 'descend',
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
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        render: (cell, row) => row.isPrintCertificateAllowed && (
          <div>
            <Button
              icon="file-pdf"
              onClick={() => props.onDownload(row.studentCourse)}
            />
          </div>
        ),
      },
    ]}
    rows={props.students}
    onChange={props.onChange}
    pagination={props.pagination}
  />
);

FinishedStudentCourseList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  isWhitelabel: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FinishedStudentCourseList;
