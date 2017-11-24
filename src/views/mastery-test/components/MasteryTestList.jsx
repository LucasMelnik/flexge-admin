import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const MasteryTestList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Mastery Test',
        path: 'index',
      },
      {
        label: 'Percentage to Activate',
        path: 'modulePercentageToActive',
      },
      {
        label: 'Deadline Time',
        path: 'deadlineTime',
        render: (cell, row) => formatTimeFromSeconds(row.deadlineTime),
      },
      {
        label: 'Score to Pass',
        path: 'scoreToPass',
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
                onClick={() => props.onDelete(row.module, row.id)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/modules/${row.module}/mastery-tests/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.masteryTests}
  />
);

MasteryTestList.propTypes = {
  masteryTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    modulePercentageToActive: PropTypes.string.isRequired,
    scoreToPass: PropTypes.number.isRequired,
    module: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

MasteryTestList.defaultProps = {
  onDelete: null,
};

export default MasteryTestList;
