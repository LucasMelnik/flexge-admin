import React from 'react';
import Block from 'jsxstyle/Block';
import PropTypes from 'prop-types';

const Title = props => (
  <Block
    component="h1"
    color="#303f9f"
    margin={0}
    fontSize={28}
    fontWeight={500}
  >
    {props.children}
  </Block>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
