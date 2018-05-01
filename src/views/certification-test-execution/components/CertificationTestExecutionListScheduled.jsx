import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import CertificationTestScheduleDialogContainer from './CertificationTestScheduleDialogContainer';

const CertificationTestExecutionListScheduled = props => (
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
        label: 'Schedule At',
        path: 'scheduledAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Schedule For',
        path: 'scheduledFor',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Enabled At',
        path: 'enabledAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
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
        label: 'Actions',
        path: 'action',
        width: '100px',
        render: (cell, row) => (
          <div>
            {!row.enabledAt && (
              <CertificationTestScheduleDialogContainer
                certificationTest={row}
                onSuccess={props.onLoad}
              />
            )}
            {' '}
            {(!row.enabledAt && moment(row.scheduledFor).diff(moment(), 'hours') <= 1) && (
              <Button
                icon="play-circle"
                onClick={() => browserHistory.push(`/certification-test-executions/${row.id}`)}
              />
            )}
          </div>
        ),
      },
    ]}
    rows={props.certificationTests}
  />
);

CertificationTestExecutionListScheduled.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    enabledAt: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default CertificationTestExecutionListScheduled;
