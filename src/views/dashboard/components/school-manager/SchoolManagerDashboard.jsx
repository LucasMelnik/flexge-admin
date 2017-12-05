import React from 'react';
import Separator from '../../../../core/layout/Separator';
import PerformanceGoals from '../common/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const SchoolManagerDashboard = () => (
  <div>
    <Separator />
    <h1>Welcome back Filipe Colpo.</h1>
    <Separator />
    <PerformanceGoals />
    <Separator />
    <MetricCharts />
    <Separator />
    <HistoryCharts />
  </div>
);

export default SchoolManagerDashboard;
