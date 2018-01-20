import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const UnitItemExecutionStatsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Module',
        path: 'module.name',
      },
      {
        label: 'Unit',
        path: 'unit.name',
      },
      {
        label: 'Unit Group',
        path: 'unit.group',
        width: '90px',
      },
      {
        label: 'Item order',
        path: 'order',
        width: '90px',
      },
      {
        label: 'Item group',
        path: 'group',
        width: '90px',
      },
      {
        label: 'Total',
        path: 'count',
        width: '90px',
      },
      {
        label: 'Wrong %',
        path: 'wrongCount',
        render: (value, row) => value ? `${((value / row.count) * 100).toFixed(1)}%` : 0,
        width: '90px',
      },
      {
        label: 'Most used Answer',
        path: 'mostUsedAnswer',
      },
      {
        label: 'Occurrence',
        path: 'mostUsedAnswerCount',
        width: '100px',
      },
    ]}
    rows={props.items}
  />
);

UnitItemExecutionStatsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitItemExecutionStatsList;
