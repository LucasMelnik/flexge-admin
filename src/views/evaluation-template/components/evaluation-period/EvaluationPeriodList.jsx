import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import startCase from 'lodash/startCase';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import { Roles } from '../../../../core/util';

const EvaluationPeriodList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Period Type',
        path: 'type',
        width: '150px',
        render: value => startCase(value.toLowerCase()),
      },
      {
        label: 'Period Name',
        path: 'name',
        sort: true,
      },
       {
        label: 'Start',
        path: 'start',
        sort: true,
         width: '150px',
        render: value => moment.utc(value).format('DD/MM/YYYY'),
      },
      {
        label: 'End',
        path: 'end',
        sort: true,
        width: '150px',
        render: value => moment.utc(value).format('DD/MM/YYYY'),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '125px',
        render: (cell, row, index) => (
          <div>
            <Button
              icon="edit"
              onClick={() => props.onEdit(row)}
            />
            {' '}
            {(localStorage.role === Roles.ADMIN || localStorage.role === Roles.SUPPORT || localStorage.role === Roles.DISTRIBUTOR_MANAGER) &&
            moment().isAfter(moment(row.end)) &&
            row.type === 'EVALUATION' && (
              <Button
                icon="sync"
                onClick={() => props.onSyncGrades(row)}
              />
            )}
            {' '}
            {index === props.periods.length - 1 && (
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
            )}
          </div>
        ),
      },
    ]}
    rows={props.periods}
  />
);

EvaluationPeriodList.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSyncGrades: PropTypes.func.isRequired,
};

export default EvaluationPeriodList;
