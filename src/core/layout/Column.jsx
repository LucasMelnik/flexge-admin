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
  size: PropTypes.number,
};

Column.defaultProps = {
  size: 12,
};

export default Column;
