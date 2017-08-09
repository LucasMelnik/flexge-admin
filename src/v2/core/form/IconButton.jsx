import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../layout/Icon';

const IconButton = props => (
  <button
    type="button"
    className={`
      btn
      btn-${props.type}
      ${props.cornered && 'btn-corner'}
      ${props.rounded && 'btn-round'}
      ${props.bordered && 'btn-border'}
      ${props.size && `btn-${props.size}`}
    `}
    style={{
      outline: 'none',
    }}
    onClick={props.onClick}
  >
    <Icon
      name={props.icon}
      size="xs"
    />
  </button>
);

IconButton.propTypes = {
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
  icon: PropTypes.string.isRequired,
  cornered: PropTypes.bool,
  rounded: PropTypes.bool,
  bordered: PropTypes.bool,
  onClick: PropTypes.func,
};

IconButton.defaultProps = {
  type: 'primary',
  size: null,
  cornered: false,
  rounded: false,
  bordered: false,
  onClick: null,
};

export default IconButton;
