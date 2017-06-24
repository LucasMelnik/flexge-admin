import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/content/Table';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';

const TimeAmountsList = props => (
  <Paper zDepth={0}>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Time',
            path: 'time',
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

TimeAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    Time: PropTypes.string,
    amount: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  TimeAmountsList;