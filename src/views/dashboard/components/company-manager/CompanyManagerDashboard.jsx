import React from 'react';
import Separator from '../../../../core/layout/Separator';
import SummarizedStats from './SummarizedStats';
import HistoryCharts from './HistoryCharts';
import MetricCharts from './MetricCharts';

const CompanyManagerDashboard = () => (
  <div>
    <Separator />
    <h1>Welcome back Filipe Colpo.</h1>
    <Separator />
    <SummarizedStats />
    <Separator />
    <MetricCharts />
    <Separator />
    <HistoryCharts />
  </div>
);

export default CompanyManagerDashboard;
