import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const PlacementTestList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Level',
          path: 'placementTestLevel.level',
          width: '8%',
        },
        {
          label: 'Order',
          path: 'order',
          width: '8%',
        },
        {
          label: 'Grammar',
          path: 'grammar.name',
        },
        {
          label: 'Status',
          path: 'review.status',
          width: '15%',
        },
        {
          label: 'Items Count',
          path: 'items.length',
          width: '8%',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => alert()}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.placementTests}
      selectable
      onSelect={row => browserHistory.push(`/placement-test/${row.id}`)}
    />
  </Async>
);

PlacementTestList.propTypes = {
  placementTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    placementTestLevel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired,
    grammar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlacementTestList;
