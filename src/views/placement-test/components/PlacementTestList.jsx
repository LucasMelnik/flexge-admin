import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const PlacementTestList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Level',
          path: 'placementTestLevel.level',
          width: '70px',
          sort: true,
        },
        {
          label: 'Order',
          path: 'order',
          width: '75px',
          sort: true,
        },
        {
          label: 'Grammar',
          path: 'grammar.name',
        },
        {
          label: 'Status',
          path: 'reviews',
          width: '150px',
          render: (cell, row) => {
            if (!row.reviews || !row.reviews.length) {
              return 'No Reviews';
            }
            if (row.reviews.find(review => review.status === 'PENDING')) {
              return 'Pending';
            }
            if (row.reviews.find(review => review.status === 'NOT_APPROVED')) {
              return 'Not Approved';
            }
            return 'Approved';
          },
        },
        {
          label: 'Items Count',
          path: 'items.length',
          width: '105px',
        },
        {
          label: 'Items to Show',
          path: 'itemsToShow',
          width: '105px',
          render: cell => cell || 0,
        },
        {
          label: 'Extra Items',
          width: '105px',
          render: (cell, row) => (row.items.length - row.itemsToShow) || 0,
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
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  icon="edit"
                  onClick={() => browserHistory.push(`/placement-test/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.placementTests}
    />
    <small>{props.placementTests.reduce((acc, test) => acc + (test.items.length || 0), 0)} item{props.placementTests.reduce((acc, test) => acc + (test.items.length || 0), 0) > 1 && 's'} found.</small>
    <br />
    <small>{props.placementTests.reduce((acc, test) => acc + (test.itemsToShow || 0), 0)} item{props.placementTests.reduce((acc, test) => acc + (test.itemsToShow || 0), 0) > 1 && 's'} to show.</small>
  </div>
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
