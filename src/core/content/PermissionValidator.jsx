import React from 'react';
import PropTypes from 'prop-types';

const PermissionValidator = props => (
  <div>
    {props.allowedFor.find(role => role === localStorage.role) && props.children}
  </div>
);

PermissionValidator.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default PermissionValidator;
