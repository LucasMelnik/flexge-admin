import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import Divider from '../../../core/layout/Divider';

const PlacementTestList = props => (
  <Paper>
    <Divider />
    <Async fetching={props.fetching}>
      <Table
        columns={[
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
            label: 'Items Count',
            path: 'items.length',
            width: '8%',
          },
        ]}
        rows={props.placementTests}
        selectable
        onSelect={row => browserHistory.push(`/placement-test/${row.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
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
