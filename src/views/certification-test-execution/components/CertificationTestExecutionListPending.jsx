import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import CertificationTestScheduleDialogContainer from './CertificationTestScheduleDialogContainer';

const CertificationTestExecutionListPending = props => (
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
        label: 'Created At',
        path: 'createdAt',
        render: cell => cell && moment(cell).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row) => (
          <CertificationTestScheduleDialogContainer
            certificationTest={row}
            onSuccess={props.onLoad}
          />
        ),
      },
    ]}
    rows={props.certificationTests}
  />
);

CertificationTestExecutionListPending.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default CertificationTestExecutionListPending;
