import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';

const StudentMasteryResultList = props => (
  <Table
    columns={[
      {
        label: 'ID',
        path: 'id',
        isKey: true,
        hidden: true,
      },
      {
        label: 'Score',
        path: 'score',
        width: '80',
      },
      {
        label: 'Score to Pass',
        path: 'scoreToPass',
        width: '80',
      },
      {
        label: 'Started At',
        path: 'startedAt',
        render: cell => moment(cell).format('DD/MM/YYYY hh:mm:ss'),
      },
      {
        label: 'Completed  At',
        path: 'completedAt',
        render: cell => moment(cell).format('DD/MM/YYYY hh:mm:ss'),
      },
    ]}
    rows={props.executions}
  />
);

StudentMasteryResultList.propTypes = {
  executions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    completedAt: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    scoreToPass: PropTypes.number.isRequired,
  })).isRequired,
};

export default StudentMasteryResultList;
