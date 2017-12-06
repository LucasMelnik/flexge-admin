import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CertificationTestList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Student',
        path: 'student.name',
        sort: true,
      },
      {
        label: 'Schedule At',
        path: 'scheduledAt',
      },
      {
        label: 'Schedule For',
        path: 'scheduledFor',
      },
      {
        label: 'Enabled At',
        path: 'enabledAt',
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
        label: 'Document',
        path: 'document',
      },
      {
        label: 'Comments',
        path: 'comments',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/certification-test/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.certificationTests}
  />
);

CertificationTestList.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CertificationTestList;
