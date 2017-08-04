import React from 'react';
import PropTypes from 'prop-types';

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
  >
    <i className={props.icon} />
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
};

IconButton.defaultProps = {
  type: 'primary',
  size: null,
  cornered: false,
  rounded: false,
  bordered: false,
};

export default IconButton;
