import React from 'react';
import { observer } from 'mobx-react';
import AverageEnglishLevelService from '../../../services/AverageEnglishLevelService';
import EnglishLevelByPeriodChart from './EnglishLevelByPeriodChart';

const EnglishLevelByPeriodChartContainer = () => (
  <EnglishLevelByPeriodChart
    data={AverageEnglishLevelService.data}
    loading={AverageEnglishLevelService.fetch.fetching}
  />
);

export default observer(EnglishLevelByPeriodChartContainer);
