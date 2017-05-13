import React from 'react';
import PropTypes from 'prop-types';

const Button = ({children, disabled, onClick}) => (
  <button onClick={onClick}
          disabled={disabled}>
    {children}
  </button>
);

Button.defaultProps = {
  disabled: false
};

Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
