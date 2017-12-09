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

  getData = () => {
    if (AverageStudyQualityService.fetch.fetching) {
      return [];
    }
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = AverageStudyQualityService.studyQualityAverages[0];
      if (!school) {
        return [];
      }
      return school.classes.map(schoolClass => ({
        label: schoolClass.className,
        value: schoolClass.classAverageScore,
      }));
    }
    const schools = AverageStudyQualityService.studyQualityAverages;
    if (!schools.length) {
      return [];
    }
    return schools.map(school => ({
      label: school.name,
      value: school.schoolAverageScore,
    }));
  };

  render() {
    return (
      <StudyQualityChart
        title={this.getTitle()}
        data={this.getData()}
        loading={AverageStudyQualityService.fetch.fetching}
      />
    );
  }
}

export default observer(StudyQualityChartContainer);
