import React  from 'react';
import { observer } from 'mobx-react';
import SemiannualEnglishLevelProgressService from '../../../services/SemiannualEnglishLevelProgressService';
import SemiannualEnglishLevelProgressChart from './SemiannualEnglishLevelProgressChart';

const SemiannualEnglishLevelProgressChartContainer = () => (
  <SemiannualEnglishLevelProgressChart
    data={localStorage.getItem('role') === 'SCHOOL_MANAGER' ?
      SemiannualEnglishLevelProgressService.byClass.map(schoolClass => ({
        averageProgress: schoolClass.classAverageProgress ? schoolClass.classAverageProgress.toFixed(1) : 0,
        name: schoolClass.name,
      })) : SemiannualEnglishLevelProgressService.data.map(school => ({
        averageProgress: school.schoolAverageProgress ? school.schoolAverageProgress.toFixed(1) : 0,
        name: school.name,
      }))
    }
    loading={SemiannualEnglishLevelProgressService.fetch.fetching}
  />
);

export default observer(SemiannualEnglishLevelProgressChartContainer);
