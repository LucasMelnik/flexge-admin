import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import MetricStatusCard from './MetricStatusCard';

const B2Projection = props => (
  <MetricStatusCard
    loading={props.loading}
    title="B2 Projection"
  >
    {moment.duration(props.projection, 'months').format()}
  </MetricStatusCard>
);

B2Projection.propTypes = {
  projection: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

B2Projection.defaultProps = {
  projection: null,
};

export default B2Projection;
