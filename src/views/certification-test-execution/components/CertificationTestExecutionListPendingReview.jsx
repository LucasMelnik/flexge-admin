import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';

const CertificationTestExecutionListPendingReview = props => (
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
        label: 'Started At',
        path: 'startedAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Completed At',
        path: 'completedAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Reading Score',
        path: 'readingScore',
      },
      {
        label: 'Listening Score',
        path: 'listeningScore',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row) => (
          <Button
            icon="export"
            onClick={() => browserHistory.push(`/certification-test-executions/${row.id}/details`)}
          />
        ),
      },
    ]}
    rows={props.certificationTests}
  />
);

CertificationTestExecutionListPendingReview.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CertificationTestExecutionListPendingReview;
