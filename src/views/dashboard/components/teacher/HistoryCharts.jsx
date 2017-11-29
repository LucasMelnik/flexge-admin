import React from 'react';
import StudentStudyHistoryChart from './StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import StudentAverageStudiedTimeChart from './StudentAverageStudiedTimeChart';

const HistoryCharts = () => (
  <div>
    <h1>Seu Historico</h1>
    <StudentStudyHistoryChart />
    <Separator />
    <StudentAverageStudiedTimeChart />
  </div>
);

export default HistoryCharts;
