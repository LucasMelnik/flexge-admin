import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const DifficultyLevelAmountsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
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
