import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const SchoolEvaluationList = props => (
  <Table
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Bonus Week',
        path: 'bonusWeeks',
      },
      {
        label: 'Start',
        path: 'start',
        render: value => moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'End',
        path: 'end',
        render: value => moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row, index) => index === (props.evaluations.length - 1) && (
          <Button
            icon="delete"
            onClick={() => props.onDelete(row)}
          />
        ),
      },
    ]}
    rows={props.evaluations}
  />
);

SchoolEvaluationList.propTypes = {
  evaluations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolEvaluationList;
