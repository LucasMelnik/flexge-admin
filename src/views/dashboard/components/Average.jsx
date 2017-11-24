import React from 'react';
import PropTypes from 'prop-types';

const Average = props => (
  <div>
    <div
      style={{
        display: 'inline-block',
      }}
    >
      <b>Average: </b> {props.average.toFixed(2)}
    </div>
    {props.from && props.to && (
      <div
        style={{
          display: 'inline-block',
          marginLeft: 15,
        }}
      >
        <small>The average must be between {props.from} and {props.to}</small>
      </div>
    )}
  </div>
);

Average.propTypes = {
  average: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
};

export default Average;
