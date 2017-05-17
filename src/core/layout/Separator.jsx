import React, { PropTypes } from 'react';

const Separator = props => (
  <div
    style={{
      height: ({
        xs: 10,
        sm: 20,
        md: 30,
        lg: 40,
        xl: 50,
        xxl: 60,
        xxxl: 70,
      })[props.size],
    }}
  />
);

Separator.propTypes = {
  size: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl',
  ]).isRequired,
};

export default Separator;
