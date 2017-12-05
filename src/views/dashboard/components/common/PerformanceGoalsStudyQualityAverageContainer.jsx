import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityDashboardService from '../../services/StudyQualityDashboardService';
import CircularProgress from '../../../../core/layout/CircularProgress';
import Async from '../../../../core/layout/Async';

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
      return school.classes.reduce((acc, schoolClass) => acc + schoolClass.classAverageScore, 0) / school.classes.length;
    }
    const schools = StudyQualityDashboardService.schoolStudyQualityScores;
    return schools.reduce((acc, schoolScore) => acc + schoolScore.schoolAverageScore, 0) / schools.length;
  };

  getSchoolAverage = () => !StudyQualityDashboardService.loadingStudyQualityScores &&
    StudyQualityDashboardService.schoolStudyQualityScores[0].schoolAverageScore;

  render() {
    return (
      <Async fetching={StudyQualityDashboardService.loadingStudyQualityScores}>
        <CircularProgress
          title="Study Quality"
          tooltip="Your classes average"
          value={this.getValue() + 5}
          max={20}
          valueRender={value => value - 5}
          successCondition={value => value > 10}
          badCondition={value => value < 5}
          legend={localStorage.role === 'TEACHER' && `School average ${this.getSchoolAverage()}`}
        />
      </Async>
    );
  }
}

export default observer(PerformanceGoalsStudyQualityAverageContainer);
