import React from 'react';
import Separator from '../../../../core/layout/Separator';
import PerformanceGoals from '../common/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const TeacherDashboard = () => (
  <div>
    <Separator size="xs" />
    <h2>Performance Goals</h2>
    <Separator size="xs" />
    <PerformanceGoals />
    <Separator />
    <h2>Your Metrics</h2>
    <Separator size="xs" />
    <MetricCharts />
    <Separator size="xs" />
    <HistoryCharts />
    <Separator size="xs" />
  </div>
);

export default TeacherDashboard;
