import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityChartContainer from '../common/metrics/StudyQualityChartContainer';
import StudyQualityGroupChartContainer from '../common/metrics/StudyQualityGroupChartContainer';
import StudiedTimeChartContainer from '../common/metrics/StudiedTimeChartContainer';
import ActiveStudentsByWeekChartContainer from '../common/metrics/ActiveStudentsByWeekChartContainer';

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
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20 }}>
      <StudiedTimeChartContainer />
    </div>
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20 }}>
      <StudyQualityChartContainer />
      <Separator size="xs" />
      <StudyQualityGroupChartContainer />
    </div>
    <div style={{ flex: '1 1 300px', maxWidth: 500, minWidth: 300, paddingRight: 20, paddingTop: 20 }}>
      <ActiveStudentsByWeekChartContainer />
    </div>
  </div>
);

export default MetricCharts;
