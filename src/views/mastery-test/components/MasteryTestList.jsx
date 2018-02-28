import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import replace from 'lodash/replace';
import StatusItem from '../../../core/layout/StatusItem';

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
        label: 'Status Format',
        path: 'review.statusFormat',
        width: '150px',
        render: value => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              AWAITING_REVIEW: '#758C98',
            }[value || 'AWAITING_REVIEW']}
            text={replace((value || 'AWAITING_REVIEW'), '_', ' ')}
          />
        ),
      },
      {
        label: 'Status Content',
        path: 'review.statusContent',
        width: '150px',
        render: value => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              AWAITING_REVIEW: '#758C98',
            }[value || 'AWAITING_REVIEW']}
            text={replace((value || 'AWAITING_REVIEW'), '_', ' ')}
          />
        ),
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
