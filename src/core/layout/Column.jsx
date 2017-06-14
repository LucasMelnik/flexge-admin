import React from 'react';
import PropTypes from 'prop-types';
import './column.css';

const Column = props => (
  <div
    className={`
      ${props.lgSize ? `col-lg-${props.lgSize}` : ''}
      ${props.mdSize ? `col-md-${props.mdSize}` : ''}
      ${props.smSize ? `col-sm-${props.smSize}` : ''}
      ${props.xsSize ? `col-xs-${props.xsSize}` : ''}
    `}
  >
    {props.children}
  </div>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  lgSize: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  mdSize: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  smSize: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  xsSize: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

Column.defaultProps = {
  lgSize: null,
  mdSize: null,
  smSize: null,
  xsSize: 12,
};

export default Column;
