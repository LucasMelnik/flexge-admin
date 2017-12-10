import React from 'react';
import Separator from '../../../../core/layout/Separator';
import WeeklyStudyingStudentsChartContainer from '../common/history/WeeklyStudyingStudentsChartContainer';
import WeeklyStudyTimeChartContainer from '../common/history/WeeklyStudyTimeChartContainer';
import HistoryListFilterContainer from '../common/history/HistoryListFilterContainer';
import WeeklyStudyQualityChartContainer from '../common/history/WeeklyStudyQualityChartContainer';

const HistoryCharts = () => (
  <div>
    <div
      style={{
        display: 'flex',
        height: 50,
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
    <WeeklyStudyingStudentsChartContainer />
    <Separator />
    <WeeklyStudyTimeChartContainer />
    <Separator />
    <WeeklyStudyQualityChartContainer />
  </div>
);

export default HistoryCharts;
