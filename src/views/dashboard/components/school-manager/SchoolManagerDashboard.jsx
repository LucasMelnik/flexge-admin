import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import PerformanceGoals from '../common/performance-goals/PerformanceGoals';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const SchoolManagerDashboard = () => (
  <div>
    <div id="performance-goals-card" style={{ marginLeft: -30, marginRight: -30, marginTop: -10 }}>
      <Card title="Performance Goals">
        <PerformanceGoals />
      </Card>
    </div>
    <Separator />
    <MetricCharts />
    <Separator />
    <HistoryCharts />
  </div>
);

export default SchoolManagerDashboard;
