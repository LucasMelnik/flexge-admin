import React from 'react';
import Separator from '../../../../core/layout/Separator';
import HistoryListFilterContainer from '../common/history/HistoryListFilterContainer';
import WeeklyStudyingStudentsChartContainer from '../common/history/WeeklyStudyingStudentsChartContainer';
import WeeklyStudyTimeChartContainer from '../common/history/WeeklyStudyTimeChartContainer';
import WeeklyStudyQualityChartContainer from '../common/history/WeeklyStudyQualityChartContainer';

const HistoryCharts = () => (
  <div>
    <div
      style={{
        display: 'flex',
      }}
    >
      <h3
        style={{
          marginRight: 10,
        }}
      >
        History By Year
      </h3>
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
