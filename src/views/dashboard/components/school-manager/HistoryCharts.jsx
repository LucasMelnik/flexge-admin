import React from 'react';
import Separator from '../../../../core/layout/Separator';
import WeeklyStudyingStudentsChartContainer from '../common/history/WeeklyStudyingStudentsChartContainer';
import WeeklyStudyTimeChartContainer from '../common/history/WeeklyStudyTimeChartContainer';
import WeeklyStudyQualityChart from '../common/history/WeeklyStudyQualityChart';
import HistoryListFilterContainer from '../common/history/HistoryListFilterContainer';

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
    <WeeklyStudyingStudentsChartContainer />
    <Separator />
    <WeeklyStudyTimeChartContainer />
    <Separator />
    <WeeklyStudyQualityChart />
  </div>
);

export default HistoryCharts;
