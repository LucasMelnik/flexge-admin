import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const Async = props => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    {props.fetching ? (
      <Spin
        size={{
          xs: 'small',
          sm: 'default',
          md: 'large',
        }[props.size]}
      />
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
