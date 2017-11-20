import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

const Column = props => (
  <Col
    lg={props.lgSize}
    xl={props.lgSize}
  >
    {props.children}
  </Col>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  lgSize: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

Column.defaultProps = {
  lgSize: 12,
};

export default Column;
