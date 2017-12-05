import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../core/layout/Card';
import { RED,ORANGE, GREEN } from '../../../../core/chart/colors';

const MetricStatusCard = props => (
  <Card
    style={{
      padding: 10,
      borderBottom: `2px solid ${{
        bad: RED,
        normal: ORANGE,
        good: GREEN,
      }[props.status]}`,
    }}
  >
    {props.children}
  </Card>
);

MetricStatusCard.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.oneOf(['bad', 'normal', 'good']).isRequired,
};

export default MetricStatusCard;
