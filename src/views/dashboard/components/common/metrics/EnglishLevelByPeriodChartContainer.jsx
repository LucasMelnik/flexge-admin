import React from 'react';
import { observer } from 'mobx-react';
import SemiannualAverageEnglishLevelService from '../../../services/SemiannualAverageEnglishLevelService';
import EnglishLevelByPeriodChart from './EnglishLevelByPeriodChart';

const EnglishLevelByPeriodChartContainer = () => (
  <EnglishLevelByPeriodChart
    data={SemiannualAverageEnglishLevelService.data}
    loading={SemiannualAverageEnglishLevelService.fetch.fetching}
  />
);

export default observer(EnglishLevelByPeriodChartContainer);
