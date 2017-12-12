import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import WeeklyStudyingStudentsChart from './WeeklyStudyingStudentsChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

const WeeklyStudyingStudentsChartContainer = () => (
  <WeeklyStudyingStudentsChart
    data={toJS(WeekStatsByPeriodService.data)}
    loading={WeekStatsByPeriodService.fetch.fetching}
  />
);

export default observer(WeeklyStudyingStudentsChartContainer);
