import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityDashboardService from '../../services/StudyQualityDashboardService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsStudyQualityAverageContainer extends Component {

  componentWillMount() {
    StudyQualityDashboardService.loadStudyQualityScores();
  }

  getValue = () => {
    if (StudyQualityDashboardService.loadingStudyQualityScores) {
      return 0;
    }

    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = StudyQualityDashboardService.schoolStudyQualityScores[0];
      if (!school) {
        return null;
      }
      return (
        school.classes.reduce((acc, schoolClass) => acc + schoolClass.classAverageScore, 0) /
        school.classes.length
      ) + 5;
    }
    const schools = StudyQualityDashboardService.schoolStudyQualityScores;
    if (!schools.length) {
      return null;
    }
    return (schools.reduce((acc, schoolScore) => acc + schoolScore.schoolAverageScore, 0) / schools.length) + 5;
  };

  getSchoolAverage = () => !StudyQualityDashboardService.loadingStudyQualityScores &&
    StudyQualityDashboardService.schoolStudyQualityScores[0] &&
    StudyQualityDashboardService.schoolStudyQualityScores[0].schoolAverageScore;

  render() {
    return (
      <CircularProgress
        fetching={StudyQualityDashboardService.loadingStudyQualityScores}
        noDataText="No Study Quality found"
        title="Study Quality"
        tooltip="Your classes average"
        value={this.getValue()}
        max={20}
        valueRender={value => value - 5}
        successCondition={value => value > 10}
        badCondition={value => value < 5}
        legend={localStorage.role === 'TEACHER' && `School average ${this.getSchoolAverage()}`}
      />
    );
  }
}

export default observer(PerformanceGoalsStudyQualityAverageContainer);
