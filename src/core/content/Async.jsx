import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Spinner from './Spinner';

const Async = props => (
  <div>
    {props.fetching ? (
      <Block textAlign="center">
        <Spinner size={20} />
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
