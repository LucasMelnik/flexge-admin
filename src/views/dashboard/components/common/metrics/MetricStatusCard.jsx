import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import Separator from '../../../../../core/layout/Separator';
import { RED, ORANGE, GREEN } from '../../../../../core/chart/colors';

const MetricStatusCard = props => (
  <Card
    loading={props.loading}
    style={{
      padding: 10,
      borderBottom: `2px solid ${{
        bad: RED,
        normal: ORANGE,
        good: GREEN,
      }[props.status]}`,
    }}
  >
    <Separator size="xs" />
    <p>{props.title}</p>
    <Separator size="xs" />
    {props.children}
  </Card>
);

MetricStatusCard.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  status: PropTypes.oneOf(['bad', 'normal', 'good']),
  title: PropTypes.string.isRequired,
};

MetricStatusCard.defaultProps = {
  loading: false,
  status: null,
};

export default MetricStatusCard;
