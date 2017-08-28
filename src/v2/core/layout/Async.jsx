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
          marginLeft: 35,
        }}
      >
        <div className={`spinner spinner-${props.size}`} />
      </div>
    ) : (
      props.children
    )}
  </div>
);

Async.propTypes = {
  fetching: PropTypes.bool.isRequired,
  children: PropTypes.node,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
};

Async.defaultProps = {
  size: 'md',
  children: null,
};

export default Async;
