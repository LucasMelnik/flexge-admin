import React from 'react';
import PropTypes from 'prop-types';
import MetricStatusCard from './MetricStatusCard';

const SemiannualAverageProgress = props => (
  <MetricStatusCard
    loading={props.loading}
    title="Semiannual Average Progress"
  >
    {props.progress}
  </MetricStatusCard>
);

SemiannualAverageProgress.propTypes = {
  progress: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

SemiannualAverageProgress.defaultProps = {
  progress: null,
};

export default SemiannualAverageProgress;
