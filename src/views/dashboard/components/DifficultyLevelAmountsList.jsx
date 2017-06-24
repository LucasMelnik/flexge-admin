import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/content/Table';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';

const DifficultyLevelAmountsList = props => (
  <Paper zDepth={0}>
    <Async fetching={props.fetching}>
      <Table
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
    </Async>
  </Paper>
);

DifficultyLevelAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    difficultyLevel: PropTypes.string,
    amount: PropTypes.number,
    points: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  DifficultyLevelAmountsList;