import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

const CertificationTestExecutionListCompleted = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Course',
        path: 'course.name',
        sort: true,
      },
      {
        label: 'Student',
        path: 'student.name',
        sort: true,
      },
      {
        label: 'Classroom',
        path: 'student.schoolClass.name',
        sort: true,
      },
      {
        label: 'School',
        path: 'student.schoolClass.school.name',
        sort: true,
      },
      {
        label: 'Teacher',
        path: 'student.schoolClass.teacher.name',
        sort: true,
      },
      {
        label: 'Corrected At',
        path: 'reviewedAt',
        width: '100px',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Approved At',
        path: 'approvedAt',
        width: '100px',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Failed At',
        path: 'failedAt',
        width: '100px',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Score',
        path: 'readingScore',
        width: '65px',
        render: (cell, row) => (
          <div>
            <span>
              R: {row.readingScore || '-'}
            </span>
            <br />
            <span>
              L: {row.listeningScore || '-'}
            </span>
            <br />
            <span>
              W: {row.writingScore || '-'}
            </span>
            <br />
            <span>
              S: {row.speakingScore || '-'}
            </span>
          </div>
        ),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '95px',
        render: (cell, row) => (
          <React.Fragment>
            <Button
              icon="export"
              onClick={() => browserHistory.push(`/certification-test-executions/${row.id}/details`)}
            />
            {row.approvedAt && ['ADMIN', 'DISTRIBUTOR_MANAGER'].some(role => localStorage.role === role) && (
              <React.Fragment>
                <ColumnSeparator size="xs" />
                <Button
                  icon="file-text"
                  onClick={() => props.onDownload(row)}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ),
      },
    ]}
    rows={props.certificationTests}
  />
);

CertificationTestExecutionListCompleted.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default CertificationTestExecutionListCompleted;
