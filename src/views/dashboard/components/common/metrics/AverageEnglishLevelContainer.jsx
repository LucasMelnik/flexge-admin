import React  from 'react';
import { observer } from 'mobx-react';
import EnglishLevelService from '../../../services/EnglishLevelService';
import AverageEnglishLevel from './AverageEnglishLevel';
import { englishLevelCourses } from '../../../../../core/consts';

const AverageEnglishLevelContainer = () => (
  <AverageEnglishLevel
    level={EnglishLevelService.average.toFixed(2)}
    course={englishLevelCourses.find((level) => {
      console.log('level', level, EnglishLevelService.average);
      return EnglishLevelService.average >= level.value;
    }).label}
    loading={EnglishLevelService.fetch.fetching}
  />
);
export default observer(AverageEnglishLevelContainer);
