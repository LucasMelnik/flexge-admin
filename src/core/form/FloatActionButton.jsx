import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const FloatActionButton = props => (
  <FloatingActionButton
    secondary = {props.secondary}
    style = {props.style}
    onClick = {props.onClick}
    disabled = {props.disabled}
  >
    <FontIcon
      className="material-icons"
      style={{ fontSize: 18 }}
    >
      {props.icon}
    </FontIcon>
  </FloatingActionButton>
)

FloatActionButton.propTypes = {
  position: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

FloatActionButton.defaultProps = {
  secondary: false,
  disabled: false,
  icon: null,
  style: null,
  position: null,
  onClick: null,
};

export default FloatActionButton;
