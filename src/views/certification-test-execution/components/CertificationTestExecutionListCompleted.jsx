import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Table from '../../../core/form/Table';
import ImagePreview from '../../../core/layout/ImagePreview';
import Button from '../../../core/form/Button';

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
        label: 'Document',
        path: 'document',
        render: (cell, row) => <ImagePreview src={row.document} />,
      },
      {
        label: 'Reviewed At',
        path: 'reviewedAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Approved At',
        path: 'approvedAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Failed At',
        path: 'failedAt',
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
        label: 'Writing Score',
        path: 'writingScore',
      },
      {
        label: 'Speaking Score',
        path: 'speakingScore',
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

CertificationTestExecutionListCompleted.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CertificationTestExecutionListCompleted;