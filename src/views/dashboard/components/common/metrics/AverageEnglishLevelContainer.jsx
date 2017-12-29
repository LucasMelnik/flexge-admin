import React  from 'react';
import { observer } from 'mobx-react';
import findLast from 'lodash/findLast';
import SemiannualAverageEnglishLevelService from '../../../services/SemiannualAverageEnglishLevelService';
import AverageEnglishLevel from './AverageEnglishLevel';
import { englishLevelCourses } from '../../../../../core/consts';

const AverageEnglishLevelContainer = () => {
  const course = findLast(
    englishLevelCourses,
    level => SemiannualAverageEnglishLevelService.average >= level.value,
  );
  return (
    <AverageEnglishLevel
      level={SemiannualAverageEnglishLevelService.average.toFixed(1)}
      course={course.label}
      loading={SemiannualAverageEnglishLevelService.fetch.fetching}
    />
  );
};

export default observer(AverageEnglishLevelContainer);
