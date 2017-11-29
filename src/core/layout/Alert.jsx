import React from 'react';
import PropTypes from 'prop-types';
import { Alert as AntAlert } from 'antd';

const Alert = props => (
  <AntAlert
    message={props.title}
    description={props.children || props.description}
    type={props.type}
    showIcon={props.showIcon}
  />
);

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
  showIcon: PropTypes.bool,
  children: PropTypes.node,
};

Alert.defaultProps = {
  type: 'info',
  showIcon: true,
  description: null,
  children: null,
};

export default Alert;
