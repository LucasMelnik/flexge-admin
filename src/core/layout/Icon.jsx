import React from 'react';
import PropTypes from 'prop-types';
import { Icon as AntIcon } from 'antd';

const Icon = props => (
  <AntIcon
    type={props.name}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
