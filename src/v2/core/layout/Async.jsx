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
        <div className={`spinner spinner-${props.size}`} />
      </div>
    ) : (
      props.children
    )}
  </div>
);

Async.propTypes = {
  fetching: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'md']),
};

Async.defaultProps = {
  size: 'md',
};

export default Async;
