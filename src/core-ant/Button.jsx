import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

const Button = props => (
  <AntButton
    disabled={props.disabled}
    type={props.type}
    htmlType={props.buttonType}
    onClick={() => props.onClick && props.onClick()}
    icon={props.icon}
    shape={props.circle ? 'circle' : null}
  >
    {props.children}
  </AntButton>
);

Button.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'primary',
    'danger',
    'dashed',
    'ghost',
  ]),
  icon: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  circle: PropTypes.bool,
  buttonType: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'default',
  disabled: null,
  buttonType: 'button',
  circle: false,
  onClick: null,
  icon: null,
  children: null,
};

export default Button;
