import React from 'react';
import PropTypes from 'prop-types';
import { Row as AntRow } from 'antd';

const Row = props => (
  <AntRow className="row">
    {props.children}
  </AntRow>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Row;
