import React from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import ActiveStudentsByPeriodChart from './ActiveStudentsByPeriodChart';

const ActiveStudentsByPeriodChartContainer = () => (
  <ActiveStudentsByPeriodChart
    data={ActiveStudentsByPeriodService.averageByPeriod}
    loading={ActiveStudentsByPeriodService.fetch.fetching}
  />
);

export default observer(ActiveStudentsByPeriodChartContainer);
