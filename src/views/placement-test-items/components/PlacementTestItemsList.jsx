import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';

const PlacementTestItemsList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'item.id',
          isKey: true,
          hidden: true,
        },
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
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
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
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
        }
      ]}
      rows={props.items}
    />
  </Async>
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
