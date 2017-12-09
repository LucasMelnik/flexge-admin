import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import WeeklyStudyTimeChartContainer from '../common/WeeklyStudyTimeChartContainer';
import HistoryListFilterContainer from '../common/HistoryListFilterContainer';
import WeeklyStudyQualityChart from '../common/WeeklyStudyQualityChart';

const HistoryCharts = () => (
  <div>
    <div
      style={{
        display: 'flex',
      }}
    >
      <h2
        style={{
          marginRight: 10,
        }}
      >
        History By Year
      </h2>
      <HistoryListFilterContainer />
    </div>
    <StudentStudyHistoryChart />
    <Separator />
    <WeeklyStudyTimeChartContainer />
    <Separator />
    <WeeklyStudyQualityChart />
  </div>
);

export default HistoryCharts;
