import React from 'react';
import { observer } from 'mobx-react';
import WeeklyStudyTimeChart from './WeeklyStudyTimeChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

const WeeklyStudyTimeChartContainer = () => (
  <WeeklyStudyTimeChart
    data={WeekStatsByPeriodService.data}
    loading={WeekStatsByPeriodService.fetch.fetching}
  />
);

export default observer(WeeklyStudyTimeChartContainer);
