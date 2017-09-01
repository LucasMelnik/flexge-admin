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
          path: 'reviews',
          width: '15%',
          render: (cell, row) => {
            return row.reviews.length ? row.reviews.find(review => review.status !== 'APPROVED') ? 'Not Approved' : 'Approved' : 'No Reviews';
          }
        },
        {
          label: 'Items Count',
          path: 'items.length',
          width: '8%',
        },
        {
          label: 'Items to Show',
          path: 'itemsToShow',
          width: '8%',
          render: (cell, row) => {
            return cell || 0;
          }
        },
        {
          label: 'Extra Items',
          path: 'items.length',
          width: '8%',
          render: (cell, row) => {
            return (row.items.length - row.itemsToShow) || 0;
          }
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
                  onClick={() => browserHistory.push(`/placement-test/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.placementTests}
      selectable
      onSelect={row => null}
    />
    <small>{props.placementTests.reduce((acc, test) => acc + (test.items.length || 0), 0)} item{props.placementTests.reduce((acc, test) => acc + (test.items.length || 0), 0) > 1 && 's'} found.</small>
    <br/>
    <small>{props.placementTests.reduce((acc, test) => acc + (test.itemsToShow || 0), 0)} item{props.placementTests.reduce((acc, test) => acc + (test.itemsToShow || 0), 0) > 1 && 's'} to show.</small>
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
