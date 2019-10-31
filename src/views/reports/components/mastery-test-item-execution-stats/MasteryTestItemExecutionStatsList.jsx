import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import { Link } from 'react-router';

const MasteryTestItemExecutionStatsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Module',
        path: 'module.name',
        render: (value, row) => ({
          children: row.children ? value : row.id,
          props: {
            colSpan: row.children ? 1 : 2,
          },
        }),
      },
      {
        label: 'Mastery Test',
        path: 'masteryTest.modulePercentageToActive',
        render: (value, row) => ({
          children: row.children ? `${value}%` : '',
          props: {
            colSpan: row.children ? 1 : 0,
          },
        }),
      },
      {
        label: 'Item order',
        path: 'order',
        width: '100px',
        sort: true,
      },
      {
        label: 'Total',
        path: 'count',
        width: '100px',
        sort: true,
        render: (value, row) => ({
          children: row.children ? value : row.occurrenceCount,
          props: {
            colSpan: row.children ? 1 : 2,
          },
        })
      },
      {
        label: 'Wrong %',
        path: 'wrongCount',
        width: '100px',
        sort: true,
        render: (value, row) => ({
          children: row.children ? `${((value / row.count) * 100).toFixed(1)}%` : '',
          props: {
            colSpan: row.children ? 1 : 0,
          },
        }),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '75px',
        align: 'center',
        render: (value, row) => (!!row.children) && (
          <Link
            target="_blank"
            to={`/modules/${row.module.id}/mastery-tests/${row.masteryTest.id}`}
          >
            Edit
          </Link>
        ),
      },
    ]}
    rows={props.items}
  />
);

MasteryTestItemExecutionStatsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default MasteryTestItemExecutionStatsList;
