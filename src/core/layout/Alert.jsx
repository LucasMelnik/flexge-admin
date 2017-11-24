import React from 'react';
import PropTypes from 'prop-types';
import { Alert as AntAlert } from 'antd';

const Alert = props => (
  <AntAlert
    message={props.title}
    description={props.description}
    type={props.type}
    showIcon
  />
);

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
