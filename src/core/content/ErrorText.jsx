import React from 'react';
import Block from 'jsxstyle/Block';
import PropTypes from 'prop-types';

const ErrorText = props => (
  <Block
    component="small"
    color="#f44336"
    margin={0}
    fontSize={12}
    transition="all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
  >
    <Block
      component="hr"
      borderBottom="2px solid rgb(244, 67, 54)"
      borderTop="none"
      marginTop={0}
    />
    {props.children}
  </Block>
);

ErrorText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorText;
