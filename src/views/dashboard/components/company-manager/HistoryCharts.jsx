import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import WeeklyStudyTimeChartContainer from '../common/WeeklyStudyTimeChartContainer';
import WeeklyStudyQualityChart from '../common/WeeklyStudyQualityChart';
import HistoryListFilterContainer from '../common/HistoryListFilterContainer';

const HistoryCharts = () => (
  <div>
    <div
      style={{
        display: 'flex',
      }}
    >
      <h1
        style={{
          marginRight: 10,
        }}
      >
        History By Year
      </h1>
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
