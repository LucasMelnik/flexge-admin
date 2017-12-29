import React, { Component }  from 'react';
import { observer } from 'mobx-react';
import findLast from 'lodash/findLast';
import AverageEnglishLevelService from '../../../services/AverageEnglishLevelService';
import AverageEnglishLevel from './AverageEnglishLevel';
import { englishLevelCourses } from '../../../../../core/consts';

class AverageEnglishLevelContainer extends Component {
  averageEnglishLevelService = new AverageEnglishLevelService();

  componentDidMount() {
    this.averageEnglishLevelService.load();
  }

  render() {
    const course = findLast(
      englishLevelCourses,
      level => this.averageEnglishLevelService.data >= level.value,
    );
    return (
      <AverageEnglishLevel
        level={this.averageEnglishLevelService.data ? this.averageEnglishLevelService.data.toFixed(1) : null}
        course={course ? course.label : '-'}
        loading={this.averageEnglishLevelService.fetch.fetching}
      />
    );
  }
}

export default observer(AverageEnglishLevelContainer);
