import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PerformanceGoalService from '../../services/PerformanceGoalService';
import StudyQualityScoreChart from './StudyQualityScoreChart';

class StudyQualityScoreChartContainer extends Component {

  getTitle = () => {
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      return 'Study Quality by Classes';
    }
    return 'Study Quality by Schools';
  };

  getData = () => {
    if (PerformanceGoalService.loadingStudyQualityScores) {
      return [];
    }

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = PerformanceGoalService.schoolStudyQualityScores[0];
      return school.classes.map(schoolClass => ({
        label: schoolClass.className,
        value: schoolClass.classAverageScore,
      }));
    }
    const schools = PerformanceGoalService.schoolStudyQualityScores;
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
        loading={PerformanceGoalService.loadingStudyQualityScores}
      />
    );
  }
}

export default observer(StudyQualityScoreChartContainer);

