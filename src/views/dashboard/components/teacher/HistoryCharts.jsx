import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyingStudentsByWeekChart from '../common/history/StudyingStudentsByWeekChart';
import WeeklyStudyTimeChartContainer from '../common/history/WeeklyStudyTimeChartContainer';
import HistoryListFilterContainer from '../common/history/HistoryListFilterContainer';
import WeeklyStudyQualityChart from '../common/history/WeeklyStudyQualityChart';

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
    <StudyingStudentsByWeekChart />
    <Separator />
    <WeeklyStudyTimeChartContainer />
    <Separator />
    <WeeklyStudyQualityChart />
  </div>
);

export default HistoryCharts;
