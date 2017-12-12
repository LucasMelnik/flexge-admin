import React, { Component } from 'react';
import { observer } from 'mobx-react';
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
      AverageStudyQualityService.data.map(school => school.name) :
      AverageStudyQualityService.data.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => schoolClass.className),
      ]), []);
    const values = localStorage.role === 'COMPANY_MANAGER' ?
      AverageStudyQualityService.data.map(school => Number(school.schoolAverageScore.toFixed(1))) :
      AverageStudyQualityService.data.reduce((acc, school) => ([
        ...acc,
        ...school.classes.map(schoolClass => Number(schoolClass.classAverageScore.toFixed(1))),
      ]), []);
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
