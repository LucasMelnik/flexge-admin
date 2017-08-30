import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Async from '../../../core/layout/Async';

const DifficultyLevelAmountsList = props => (
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
          label: 'Difficulty Level',
          path: 'difficultyLevel',
        },
        {
          label: 'Amount',
          path: 'amount',
        },
        {
          label: 'Points',
          path: 'points',
        },
      ]}
      rows={props.amounts}
    />
  </Async>
);

DifficultyLevelAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    difficultyLevel: PropTypes.string,
    amount: PropTypes.number,
    points: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default DifficultyLevelAmountsList;
