import React  from 'react';
import { observer } from 'mobx-react';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';
import SemiannualEnglishLevelProgressChart from './SemiannualEnglishLevelProgressChart';

const SemiannualEnglishLevelProgressChartContainer = () => (
  <SemiannualEnglishLevelProgressChart
    data={SemiannualEnglishLevelProgressService.data}
    loading={SemiannualEnglishLevelProgressService.fetch.fetching}
  />
);

export default observer(SemiannualEnglishLevelProgressChartContainer);
