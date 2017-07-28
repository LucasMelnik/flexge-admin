import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';

const TimeAmounts = props => (
  <Paper zDepth={0}>
    <Async fetching={props.fetching}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <div>
          Course time
          <h1>{props.total}</h1>
        </div>
        <div>
          Unit average time
          <h1>{props.average}</h1>
        </div>
      </div>
    </Async>
  </Paper>
);

TimeAmounts.propTypes = {
  average: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  TimeAmounts;