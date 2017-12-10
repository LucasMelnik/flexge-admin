import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

const Card = props => (
  <AntCard
    loading={props.loading}
    title={props.title}
    extra={props.actions}
    bodyStyle={props.style}
  >
    {props.children}
  </AntCard>
);

Card.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  actions: PropTypes.node,
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: null,
  actions: null,
  loading: false,
  style: {},
};

export default Card;
