import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

const FloatActionButton = (props) => {
  const buttonProps = {
    secondary: props.secondary,
    icon: <FontIcon
      className="material-icons"
      style={{ fontSize: 18 }}
           >
      {props.icon}
    </FontIcon>,
    onClick: () => props.onClick && props.onClick(),
    style: props.style,
    disabled: props.disabled,
  };

  return (<FloatingActionButton {...buttonProps}>
            {buttonProps.icon}
          </FloatingActionButton>)
};

FloatActionButton.propTypes = {
  raised: PropTypes.bool,
  position: PropTypes.string,
  secondary: PropTypes.bool,
  mini: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

FloatActionButton.defaultProps = {
  raised: true,
  secondary: false,
  mini: false,
  disabled: false,
  icon: null,
  style: null,
  position: null,
  onClick: null,
};

export default FloatActionButton;
