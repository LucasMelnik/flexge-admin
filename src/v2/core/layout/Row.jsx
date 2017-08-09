import React from 'react';
import PropTypes from 'prop-types';
import './row.css';

const Row = props => (
  <div className="row">
    {props.children}
  </div>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
