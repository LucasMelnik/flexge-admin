import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const TeacherDashboard = () => (
  <div>
    <div style={{ marginLeft: -30, marginRight: -30 }}>
      <Separator size="xs" />
      <h2 style={{ marginLeft: 30 }}>Performance Goals</h2>
      <Separator size="xs" />
      <Card title="Your goal is to keep all values green!">
        <PerformanceGoals />
      </Card>
    </div>
    <Separator />
    <h2>Your Metrics</h2>
    <Separator size="xs" />
    <MetricCharts />
    <Separator size="sm" />
    <HistoryCharts />
    <Separator size="xs" />
  </div>
);

export default TeacherDashboard;
