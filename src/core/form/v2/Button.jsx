import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <button
    type="button"
    className={`
      btn
      btn-${props.type}
      ${props.icon ? 'btn-icon right15 bottom15' : ''}
      ${props.cornered && 'btn-corner'}
      ${props.rounded && 'btn-round'}
      ${props.bordered && 'btn-border'}
      ${props.size && `btn-${props.size}`}
    `}
  >
    {props.icon && (
      <i className={props.icon} style={{ marginRight: 5 }} />
    )}
    <span>
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
  cornered: PropTypes.bool,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
};

Button.defaultProps = {
  type: 'primary',
  size: null,
  icon: null,
  cornered: false,
  rounded: false,
  bordered: false,
};

export default Button;
