import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import './Button.css';

const Button = (props) => {
  const buttonProps = {
    primary: props.primary,
    secondary: props.secondary,
    ...props.icon && {
      icon: (
        <FontIcon
          className="material-icons"
          style={{ fontSize: 18 }}
        >
          {props.icon}
        </FontIcon>
      ),
    },
    onClick: () => props.onClick && props.onClick(),
    label: props.label,
    style: props.style,
    fullWidth: props.fullWidth,
    className: props.mini ? 'mini-button' : '',
    type: props.type,
    disabled: props.disabled,
  };

  if (props.raised) {
    return (
      <RaisedButton {...buttonProps} />
    );
  }
  return (
    <FlatButton {...buttonProps} />
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  raised: PropTypes.bool,
  secondary: PropTypes.bool,
  primary: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mini: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  raised: true,
  secondary: false,
  primary: false,
  mini: false,
  disabled: false,
  fullWidth: false,
  icon: null,
  style: null,
  onClick: null,
  type: 'button',
};

export default Button;
