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
        width: '105px',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Order',
        path: 'order',
        width: '105px',
        sort: true,
      },
      {
        label: 'Item',
        path: 'item.text',
        sort: true,
      },
      {
        label: 'Total',
        path: 'answerCount',
        width: '105px',
        sort: true,
      },
      {
        label: 'Error %',
        path: 'errorPercentage',
        width: '105px',
        sort: true,
      },
      {
        label: 'Most wrong used answer',
        path: 'mostCommonWrongAnswer',
        sort: true,
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
