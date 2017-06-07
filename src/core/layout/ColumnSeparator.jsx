import React from 'react';
import PropTypes from 'prop-types';

const ColumnSeparator = props => (
  <div
    style={{
      width: ({
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

ColumnSeparator.propTypes = {
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

export default ColumnSeparator;
