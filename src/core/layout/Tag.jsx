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
    }[props.color]}
  >
    {props.children}
  </AntTag>
);

Tag.propTypes = {
  color: PropTypes.oneOf(['orange', 'red', 'green']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tag;
