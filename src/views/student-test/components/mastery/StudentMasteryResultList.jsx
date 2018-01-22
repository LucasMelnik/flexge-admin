import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';

const StudentMasteryResultList = props => (
  <Table
    columns={[
      {
        label: 'Score',
        path: 'score',
        width: '80px',
      },
      {
        label: 'Score to Pass',
        path: 'scoreToPass',
        width: '80px',
      },
      {
        label: 'Started At',
        path: 'startedAt',
        render: cell => cell ? moment(cell).format('DD/MM/YYYY hh:mm:ss') : 'N/A',
      },
      {
        label: 'Completed  At',
        path: 'completedAt',
        render: cell => cell ? moment(cell).format('DD/MM/YYYY hh:mm:ss') : 'N/A',
      },
    ]}
    rows={props.executions}
    selectable
    onSelect={row => props.onSelect(row)}
  />
);

StudentMasteryResultList.propTypes = {
  executions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    completedAt: PropTypes.string,
    score: PropTypes.number,
    scoreToPass: PropTypes.number.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentMasteryResultList;
