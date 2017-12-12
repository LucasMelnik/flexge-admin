import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const TeacherDashboard = () => (
  <div>
    <div id="performance-goals-card" style={{ marginLeft: -30, marginRight: -30, marginTop: -20 }}>
      <Card title="Performance Goals">
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
