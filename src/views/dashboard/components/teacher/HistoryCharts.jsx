import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import StudentAverageStudiedTimeChart from '../common/StudentAverageStudiedTimeChart';
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
    <Separator />
    <StudentStudyHistoryChart />
    <Separator />
    <StudentAverageStudiedTimeChart />
  </div>
);

export default HistoryCharts;
