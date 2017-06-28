import React from 'react';
import PropTypes from 'prop-types';

const Label = props => (
  <label
    style={{
      color: 'rgba(0, 0, 0, 0.3)',
      lineHeight: '22px',
      fontSize: 12,
      position: 'absolute'
    }}
  >
    {props.children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;