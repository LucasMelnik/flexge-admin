import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityScoreChartContainer from '../common/StudyQualityScoreChartContainer';
import StudyQualityGroupChartContainer from '../common/StudyQualityGroupChartContainer';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import StudentStudiedDatesChart from '../common/StudentStudiedDatesChart';

const MetricCharts = () => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <StudentStudiedTimeChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <StudyQualityScoreChartContainer />
        <Separator size="xs" />
        <StudyQualityGroupChartContainer />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <StudentStudiedDatesChart />
      </div>
    </div>
  </div>
);

export default MetricCharts;
