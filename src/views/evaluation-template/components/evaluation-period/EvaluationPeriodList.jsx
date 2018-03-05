import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';

const EvaluationPeriodList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Period Name',
        path: 'name',
        sort: true,
      },
       {
        label: 'Start',
        path: 'start',
        sort: true,
        render: value => moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'End',
        path: 'end',
        sort: true,
        render: value => moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'Bonus Weeks',
        path: 'bonusWeeks',
        sort: true,
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row, index) => index === props.periods.length - 1 && (
          <Button
            icon="delete"
            onClick={() => props.onDelete(row)}
          />
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
};

export default EvaluationPeriodList;
