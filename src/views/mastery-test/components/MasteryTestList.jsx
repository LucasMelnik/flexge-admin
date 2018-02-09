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
        sort: true,
      },
      {
        label: 'Percentage to Activate',
        path: 'modulePercentageToActive',
        sort: true,
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
        label: 'Items Count',
        path: 'itemsCount',
        width: '105px',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row.module.id, row.id)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/modules/${row.module.id}/mastery-tests/${row.id}`)}
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
    module: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

MasteryTestList.defaultProps = {
  onDelete: null,
};

export default MasteryTestList;
