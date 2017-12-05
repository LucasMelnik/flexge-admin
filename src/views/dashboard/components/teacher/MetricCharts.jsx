import React from 'react';
import Separator from '../../../../core/layout/Separator';
import SchoolClassStudyQualityChart from '../common/SchoolClassStudyQualityChart';
import StudentStudyQualityChart from '../common/StudentStudyQualityChart';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import StudentStudiedDatesChart from '../common/StudentStudiedDatesChart';

const MetricCharts = () => (
  <div>
    <h1>Estas são suas metricas.</h1>
    <Separator />
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
        <SchoolClassStudyQualityChart />
        <Separator size="xs" />
        <StudentStudyQualityChart />
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
