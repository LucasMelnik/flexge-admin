import React from 'react';
import Separator from '../../../../core/layout/Separator';
import SummarizedStats from './SummarizedStats';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const TeacherDashboard = () => (
  <div>
    <Separator />
    <h1>Welcome back Stacey Rodrigues.</h1>
    <Separator />
    <SummarizedStats />
    <Separator />
    <MetricCharts />
    <Separator />
    <HistoryCharts />
  </div>
);

export default TeacherDashboard;
