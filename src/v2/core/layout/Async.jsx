import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';

const Async = props => (
  <div>
    {props.fetching ? (
      <Block textAlign="center">
        <div>loading...</div>
      </Block>
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
