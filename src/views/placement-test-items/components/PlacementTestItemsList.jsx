import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';

const PlacementTestItemsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Level',
        path: 'placementTestLevel.level',
        width: '100px',
      },
      {
        label: 'Order',
        path: 'order',
        width: '100px',
      },
      {
        label: 'Item',
        path: 'item.text',
      },
      {
        label: 'Total',
        path: 'answerCount',
        width: '100px',
      },
      {
        label: 'Error %',
        path: 'errorPercentage',
        width: '100px',
      },
      {
        label: 'Most wrong used answer',
        path: 'mostCommonWrongAnswer',
      },
    ]}
    rows={props.items}
  />
);

PlacementTestItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    placementTestLevel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default PlacementTestItemsList;
