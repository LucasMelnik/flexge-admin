import React from 'react';
import PropTypes from 'prop-types';
import { Icon as AntIcon } from 'antd';

const Icon = props => (
  <AntIcon
    type={props.name}
    style={props.style}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

Icon.defaultProps = {
  style: {},
};

export default Icon;
