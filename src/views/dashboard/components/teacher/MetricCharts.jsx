import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityScoreChartContainer from '../common/StudyQualityScoreChartContainer';
import StudyQualityGroupChartContainer from '../common/StudyQualityGroupChartContainer';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import ActiveStudentsByWeekChart from '../common/ActiveStudentsByWeekChart';

const MetricCharts = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: -20,
      marginRight: -20,
    }}
  >
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20, }}>
      <StudentStudiedTimeChart />
    </div>
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20, }}>
      <StudyQualityScoreChartContainer />
      <Separator size="xs" />
      <StudyQualityGroupChartContainer />
    </div>
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20, }}>
      <ActiveStudentsByWeekChart />
    </div>
  </div>
);

export default MetricCharts;
