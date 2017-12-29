import React  from 'react';
import { observer } from 'mobx-react';
import findLast from 'lodash/findLast';
import AverageEnglishLevelService from '../../../services/AverageEnglishLevelService';
import AverageEnglishLevel from './AverageEnglishLevel';
import { englishLevelCourses } from '../../../../../core/consts';

const AverageEnglishLevelContainer = () => {
  const course = findLast(
    englishLevelCourses,
    level => AverageEnglishLevelService.average >= level.value,
  );
  return (
    <AverageEnglishLevel
      level={AverageEnglishLevelService.average.toFixed(1)}
      course={course.label}
      loading={AverageEnglishLevelService.fetch.fetching}
    />
  );
};

export default observer(AverageEnglishLevelContainer);
