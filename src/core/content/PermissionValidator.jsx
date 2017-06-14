import React from 'react';
import PropTypes from 'prop-types';

const PermissionValidator = props => (
  props.allowedFor.find(role => role === localStorage.role) ? props.children : null
);

PermissionValidator.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default PermissionValidator;
