import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const SchoolManagerDashboard = () => (
  <div>
    <Separator />
    <h1>Welcome back Filipe Colpo.</h1>
    <Separator />
    <Card title="Your goal is to keep all values green!">
      <PerformanceGoals />
    </Card>
    <Separator />
    <MetricCharts />
    <Separator />
    <HistoryCharts />
  </div>
);

export default SchoolManagerDashboard;
