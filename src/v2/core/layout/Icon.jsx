import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <i
    className={`
      fa ${props.name}
      icon-${props.size}
      ${props.backgroundStyle ? `icon-${props.backgroundStyle}` : ''}
    `}
    style={{
      marginRight: 10,
    }}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xlg']),
  backgroundStyle: PropTypes.oneOf(['rounded', 'cornered', 'square', 'bordered']),
};

Icon.defaultProps = {
  size: 'sm',
  backgroundStyle: null
};

export default Icon;
