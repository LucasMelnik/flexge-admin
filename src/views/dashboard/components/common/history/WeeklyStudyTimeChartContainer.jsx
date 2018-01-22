import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import WeeklyStudyTimeChart from './WeeklyStudyTimeChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

const WeeklyStudyTimeChartContainer = () => (
  <WeeklyStudyTimeChart
    data={toJS(WeekStatsByPeriodService.data)}
    loading={WeekStatsByPeriodService.fetch.fetching}
  />
);

export default observer(WeeklyStudyTimeChartContainer);
