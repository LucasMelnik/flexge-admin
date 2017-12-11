import React  from 'react';
import { observer } from 'mobx-react';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';
import SemiannualAverageProgress from './SemiannualAverageProgress';

const SemiannualAverageProgressContainer = () => (
  <SemiannualAverageProgress
    progress={SemiannualEnglishLevelProgressService.average.toFixed(2)}
    loading={SemiannualEnglishLevelProgressService.fetch.fetching}
  />
);

export default observer(SemiannualAverageProgressContainer);
