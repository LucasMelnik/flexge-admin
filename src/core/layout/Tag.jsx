import React from 'react';
import PropTypes from 'prop-types';
import { Tag as AntTag } from 'antd';
import { GREEN, ORANGE, RED } from '../chart/colors';

const Tag = props => (
  <AntTag
    color={{
      orange: ORANGE,
      green: GREEN,
      red: RED,
      none: null,
    }[props.color]}
    style={props.style}
  >
    {props.children}
  </AntTag>
);

Tag.propTypes = {
  color: PropTypes.oneOf(['orange', 'red', 'green', 'none']).isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Tag.defaultProps = {
  style: {},
};

export default Tag;
