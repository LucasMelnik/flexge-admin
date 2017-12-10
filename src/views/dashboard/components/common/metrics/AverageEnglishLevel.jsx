import React from 'react';
import PropTypes from 'prop-types';
import MetricStatusCard from './MetricStatusCard';

const AverageEnglishLevel = props => (
  <MetricStatusCard
    loading={props.loading}
    title="Average English Level"
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div>
        {props.level}
      </div>
      <div>
        {props.course}
      </div>
    </div>
  </MetricStatusCard>
);

AverageEnglishLevel.propTypes = {
  level: PropTypes.number.isRequired,
  course: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AverageEnglishLevel;
