import React from 'react';
import PropTypes from 'prop-types';
import { Card as AntCard } from 'antd';

const Card = props => (
  <AntCard
    noHovering
    loading={props.loading}
    title={props.title}
    extra={props.actions}
  >
    {props.children}
  </AntCard>
);

Card.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: null,
  actions: null,
  loading: false,
};

export default Card;
