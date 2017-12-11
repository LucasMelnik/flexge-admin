import React from 'react';
import { observer } from 'mobx-react';
import WeeklyStudyingStudentsChart from './WeeklyStudyingStudentsChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

const WeeklyStudyingStudentsChartContainer = () => (
  <WeeklyStudyingStudentsChart
    data={WeekStatsByPeriodService.data}
    loading={WeekStatsByPeriodService.fetch.fetching}
  />
);

export default observer(WeeklyStudyingStudentsChartContainer);
