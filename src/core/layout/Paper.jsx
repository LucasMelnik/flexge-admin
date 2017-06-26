import React from 'react';
import PropTypes from 'prop-types';
import { Paper as MaterialPaper } from 'material-ui';
import Block from 'jsxstyle/Block';

const Paper = props => (
  <MaterialPaper
    style={props.style}
    zDepth={props.zDepth}
    rounded={props.rounded}
  >
    <Block padding={15}>
      {props.children}
    </Block>
  </MaterialPaper>
);

Paper.propTypes = {
  style: PropTypes.object,
  zDepth: PropTypes.oneOf([0,1, 2, 3, 4, 5]),
  rounded: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Paper.defaultProps = {
  style: {},
  zDepth: 1,
  rounded: false,
};

export default Paper;
