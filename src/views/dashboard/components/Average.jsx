import React from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';

const Average = props => (
  <Paper zDepth={0}>
    <InlineBlock><b>Average: </b> {props.average.toFixed(2)}</InlineBlock>
    {props.from && props.to && (
      <InlineBlock
        marginLeft="15px"
      >
        <small>The average must be between {props.from} and {props.to}</small>
      </InlineBlock>
    )}
  </Paper>
);

Average.propTypes = {
  average: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
};

export default Average;
