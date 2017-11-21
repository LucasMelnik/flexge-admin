import React from 'react';
import PropTypes from 'prop-types';

const StatusItem = props => (
  <div
    style={{
      color: '#fff',
      padding: 5,
      fontSize: 12,
      display: 'inline-block',
      fontWeight: 'bold',
      borderRadius: 5,
      backgroundColor: props.color,
    }}
  >
    {props.text}
  </div>
);

StatusItem.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default StatusItem;
