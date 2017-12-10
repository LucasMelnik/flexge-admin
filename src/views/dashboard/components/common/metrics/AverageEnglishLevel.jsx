import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../../../core/layout/Separator';
import ColumnSeparator from '../../../../../core/layout/ColumnSeparator';
import MetricStatusCard from './MetricStatusCard';

const AverageEnglishLevel = props => (
  <MetricStatusCard
    loading={props.loading}
    title="Average English Level"
  >
    
    <div
      style={{
        display: 'inline-block',
        fontSize: 48,
        lineHeight: '48px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
        }}
      >
        {props.level}
      </div>
      <ColumnSeparator size="lg" />
      <div
        style={{
          display: 'inline-block',
        }}
      >
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
