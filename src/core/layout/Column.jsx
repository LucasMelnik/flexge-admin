import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const Column = props => (
  <Col
    {...props}
    span={props.size * 2}
  >
    {props.children}
  </Col>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

Column.defaultProps = {
  size: 12,
};

export default Column;
