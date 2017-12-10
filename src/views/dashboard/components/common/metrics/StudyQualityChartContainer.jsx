import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import AverageStudyQualityService from '../../../services/AverageStudyQualityService';
import StudyQualityChart from './StudyQualityChart';

class StudyQualityChartContainer extends Component {
  getTitle = () => {
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      return 'Study Quality by Classes';
    }
    return 'Study Quality by Schools';
  };

  render() {
    const labels = localStorage.role === 'COMPANY_MANAGER' ?
      AverageStudyQualityService.studyQualityAverages.map(school => school.name) :
      AverageStudyQualityService.studyQualityAverages.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => schoolClass.className),
      ]), 0);
    const values = localStorage.role === 'COMPANY_MANAGER' ?
      AverageStudyQualityService.studyQualityAverages.map(school => school.schoolAverageScore) :
      AverageStudyQualityService.studyQualityAverages.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => schoolClass.classAverageScore),
      ]), 0);
    return (
      <StudyQualityChart
        title={this.getTitle()}
        labels={labels}
        values={values}
        loading={AverageStudyQualityService.fetch.fetching}
      />
    );
  }
}

export default observer(StudyQualityChartContainer);
