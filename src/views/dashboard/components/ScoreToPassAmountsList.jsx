import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/content/Table';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';

const ScoreToPassAmountsList = props => (
  <Paper zDepth={0}>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'ScoreToPass',
            path: 'scoreToPass',
          },
          {
            label: 'Amount',
            path: 'amount',
          },
        ]}
        rows={props.amounts}
      />
    </Async>
  </Paper>
);

ScoreToPassAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    scoreToPass: PropTypes.number,
    amount: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  ScoreToPassAmountsList;