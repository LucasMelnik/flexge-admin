import React from 'react';
import StudentStudyHistoryChart from '../common/StudentStudyHistoryChart';
import Separator from '../../../../core/layout/Separator';
import StudentAverageStudiedTimeChart from '../common/StudentAverageStudiedTimeChart';
import WeeklyStudyQualityChart from '../common/WeeklyStudyQualityChart';

const HistoryCharts = () => (
  <div>
    <h1>Seu Histórico</h1>
    <StudentStudyHistoryChart />
    <Separator />
    <StudentAverageStudiedTimeChart />
    <Separator />
    <WeeklyStudyQualityChart />
  </div>
);

export default HistoryCharts;
