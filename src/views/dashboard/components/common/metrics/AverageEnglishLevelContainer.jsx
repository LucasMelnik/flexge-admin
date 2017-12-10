import React  from 'react';
import { observer } from 'mobx-react';
import AverageEnglishLevelService from '../../../services/AverageEnglishLevelService';
import AverageEnglishLevel from './AverageEnglishLevel';
import { englishLevelCourses } from '../../../../../core/consts';

const AverageEnglishLevelContainer = () => (
  <AverageEnglishLevel
    level={AverageEnglishLevelService.average.toFixed(2)}
    course={englishLevelCourses.find(level => (
      AverageEnglishLevelService.average >= level.value
    )).label}
    loading={AverageEnglishLevelService.fetch.fetching}
  />
);
export default observer(AverageEnglishLevelContainer);
