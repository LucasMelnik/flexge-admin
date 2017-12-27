import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import ImagePreview from '../../../core/layout/ImagePreview';

const CertificationTestExecutionListCompleted = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Student',
        path: 'student.name',
        sort: true,
      },
      {
        label: 'Document',
        path: 'document',
        render: (cell, row) => {
          if (row.document) {
            return (
              <ImagePreview src={row.document} />
            );
          }
        },
      },
      {
        label: 'Schedule At',
        path: 'scheduledAt',
        render: (cell, row) => {
          return (
            <div>
              {moment(row.scheduledAt).format('DD/MM/YYYY HH:mm')}
            </div>
          );
        },
      },
      {
        label: 'Schedule For',
        path: 'scheduledFor',
        render: (cell, row) => {
          return (
            <div>
              {moment(row.scheduledFor).format('DD/MM/YYYY HH:mm')}
            </div>
          );
        },
      },
      {
        label: 'Enabled At',
        path: 'enabledAt',
        render: (cell, row) => {
          return (
            <div>
              {moment(row.enabledAt).format('DD/MM/YYYY HH:mm')}
            </div>
          );
        },
      },
      {
        label: 'Started At',
        path: 'startedAt',
      },
      {
        label: 'Completed At',
        path: 'completedAt',
      },
      {
        label: 'Reviewed At',
        path: 'reviewedAt',
      },
      {
        label: 'Approved At',
        path: 'approvedAt',
      },
      {
        label: 'Failed At',
        path: 'failedAt',
      },
      {
        label: 'Listening Score',
      },
      {
        label: 'Speaking Score',
      },
      {
        label: 'Reading Score',
      },
      {
        label: 'Writing Score',
      },
      {
        label: 'Total Score',
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
