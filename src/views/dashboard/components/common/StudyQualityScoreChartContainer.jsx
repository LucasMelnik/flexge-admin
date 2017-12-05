import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityDashboardService from '../../services/StudyQualityDashboardService';
import StudyQualityScoreChart from './StudyQualityScoreChart';

class StudyQualityScoreChartContainer extends Component {

  getTitle = () => {
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      return 'Study Quality by Classes';
    }
    return 'Study Quality by Schools';
  };

  getData = () => {
    if (StudyQualityDashboardService.loadingStudyQualityScores) {
      return [];
    }

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = StudyQualityDashboardService.schoolStudyQualityScores[0];
      return school.classes.map(schoolClass => ({
        label: schoolClass.className,
        value: schoolClass.classAverageScore,
      }));
    }
    const schools = StudyQualityDashboardService.schoolStudyQualityScores;
    return schools.map(school => ({
      label: school.name,
      value: school.schoolAverageScore,
    }));
  };

  render() {
    return (
      <StudyQualityScoreChart
        title={this.getTitle()}
        data={this.getData()}
        loading={StudyQualityDashboardService.loadingStudyQualityScores}
      />
    );
  }
}

export default observer(StudyQualityScoreChartContainer);

