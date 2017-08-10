import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../layout/Icon';

const Button = props => (
  <button
    type={props.buttonType}
    onClick={() => props.onClick && props.onClick()}
    className={`
      btn
      btn-${props.type}
      ${props.icon ? 'btn-icon' : ''}
      ${props.cornered && 'btn-corner'}
      ${props.rounded && 'btn-round'}
      ${props.bordered && 'btn-border'}
      ${props.size && `btn-${props.size}`}
      ${props.fullWidth && 'input-block-level'}
    `}
    style={{
      outline: 'none',
    }}
  >
    {props.icon && (
      <Icon name={props.icon} size="xs" />
    )}
    <span style={{ marginLeft: props.icon ? 10 : 0 }}>
      {props.label}
    </span>
  </button>
);

Button.propTypes = {
  type: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'info',
    'warning',
    'danger',
    'purple',
    'accent',
    'secondary',
  ]),
  size: PropTypes.oneOf([
    'xs',
    'sm',
    'lg',
    'block',
  ]),
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  cornered: PropTypes.bool,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  fullWidth: PropTypes.bool,
  buttonType: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  type: 'default',
  size: null,
  icon: null,
  onClick: null,
  cornered: false,
  rounded: false,
  bordered: false,
  fullWidth: false,
  buttonType: 'button',
};

export default Button;
