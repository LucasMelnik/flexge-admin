import React from 'react';
import { observer } from 'mobx-react';
import WeeklyStudyQualityChart from './WeeklyStudyQualityChart';
import AverageStudyQualityByPeriodService from '../../../services/AverageStudyQualityByPeriodService';

const WeeklyStudyQualityChartContainer = () => (
  <WeeklyStudyQualityChart
    data={AverageStudyQualityByPeriodService.data}
    loading={AverageStudyQualityByPeriodService.fetch.fetching}
  />
);

export default observer(WeeklyStudyQualityChartContainer);
