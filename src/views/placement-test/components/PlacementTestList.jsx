import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import PlacementTestListFilterContainer from './PlacementTestListFilterContainer';
import Divider from '../../../core/layout/Divider';
import Separator from '../../../core/layout/Separator';

const PlacementTestList = props => (
  <Paper>
    <PlacementTestListFilterContainer />
    <Separator />
    <Divider />
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Level',
            path: 'level',
          },
          {
            label: 'Order',
            path: 'order',
          },
          {
            label: 'Grammar',
            path: 'grammar.name',
          },
        ]}
        rows={props.placementTests}
        selectable
        onSelect={row => browserHistory.push(`/placement-tests/${row.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

PlacementTestList.propTypes = {
  placementTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlacementTestList;
