import React from 'react';
import Separator from '../../../../core/layout/Separator';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const CompanyManagerDashboard = () => (
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

export default CompanyManagerDashboard;
