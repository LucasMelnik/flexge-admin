import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import StudentAverageStudiedTimeChart from '../common/StudentAverageStudiedTimeChart';

const HistoryCharts = () => (
  <div>
    <h1>History By Year</h1>
    <Separator />
    <StudentStudyHistoryChart />
    <Separator />
    <StudentAverageStudiedTimeChart />
  </div>
);

export default HistoryCharts;
