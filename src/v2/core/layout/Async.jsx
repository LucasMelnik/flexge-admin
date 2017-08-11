import React from 'react';
import PropTypes from 'prop-types';
import './async.css';

const Async = props => (
  <div>
    {props.fetching ? (
      <div
        style={{
          position: 'relative',
          padding: '10px 0px',
        }}
      >
        <div className="spinner" />
      </div>
    ) : (
      props.children
    )}
  </div>
);

Async.propTypes = {
  fetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Async;
