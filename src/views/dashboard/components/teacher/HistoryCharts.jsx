import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import StudentAverageStudiedTimeChart from '../common/StudentAverageStudiedTimeChart';

const HistoryCharts = () => (
  <div>
    <h1>Seu Histórico</h1>
    <StudentStudyHistoryChart />
    <Separator />
    <StudentAverageStudiedTimeChart />
  </div>
);

export default HistoryCharts;
