import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

const Card = props => (
  <AntCard title={props.title}>
    {props.children}
  </AntCard>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: null,
};

export default Card;
