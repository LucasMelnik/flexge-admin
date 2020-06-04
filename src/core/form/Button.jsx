import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';
import './Button.css';

const Button = props => (
  <AntButton
    disabled={props.disabled}
    type={props.type}
    htmlType={props.buttonType}
    onClick={props.onClick}
    icon={props.icon}
    shape={props.rounded ? 'round' : null}
    loading={props.loading}
    size={{
      sm: 'small',
      md: 'default',
      lg: 'large',
    }[props.size]}
  >
    {props.label}
  </AntButton>
);

Button.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'primary',
    'danger',
  ]),
  size: PropTypes.oneOf(['sm','md','lg']),
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  buttonType: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  type: 'default',
  icon: null,
  label: null,
  onClick: null,
  rounded: false,
  disabled: false,
  loading: false,
  buttonType: 'button',
  size: 'md',
};

export default Button;
