import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StudyQualityDashboardService from '../../services/StudyQualityDashboardService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsStudyQualityHigherThanFiveContainer extends Component {

  componentWillMount() {
    StudyQualityDashboardService.loadStudyQualityGroups();
  }

  getValue = () => {
    if (StudyQualityDashboardService.loadingStudyQualityGroups) {
      return 0;
    }

    const total = Object.keys(StudyQualityDashboardService.schoolStudyQualityGroups).reduce((acc, key) => {
      if (StudyQualityDashboardService.schoolStudyQualityGroups[key]) {
        return acc + StudyQualityDashboardService.schoolStudyQualityGroups[key].reduce((schoolAcc, school) => {
          if (school.classes) {
            return acc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
          }
          return schoolAcc;
        }, 0);
      }
      return acc;
    }, 0);

    const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
      if (StudyQualityDashboardService.schoolStudyQualityGroups[key]) {
        return acc + StudyQualityDashboardService.schoolStudyQualityGroups[key].reduce((schoolAcc, school) => {
          if (school.classes) {
            return acc + school.classes.reduce((classAcc, schoolClass) => classAcc + schoolClass.classCount, 0);
          }
          return schoolAcc;
        }, 0);
      }
      return acc;
    }, 0);

    return totalHigherThanFive / total;
  };

  getSchoolAverage = () => {
    if (StudyQualityDashboardService.loadingStudyQualityGroups) {
      return 0;
    }

    const total = Object.keys(StudyQualityDashboardService.schoolStudyQualityGroups).reduce((acc, key) => {
      if (StudyQualityDashboardService.schoolStudyQualityGroups[key]) {
        return acc + (StudyQualityDashboardService.schoolStudyQualityGroups[key].schoolCount || 0);
      }
      return acc;
    }, 0);

    const totalHigherThanFive = ['good', 'excellent'].reduce((acc, key) => {
      if (StudyQualityDashboardService.schoolStudyQualityGroups[key]) {
        return acc + (StudyQualityDashboardService.schoolStudyQualityGroups[key].schoolCount || 0);
      }
      return acc;
    }, 0);

    return totalHigherThanFive / total || 0;
  };

  render() {
    return (
      <CircularProgress
        fetching={StudyQualityDashboardService.loadingStudyQualityGroups}
        noDataText="No Study Quality found"
        title="Study Quality > 5"
        tooltip="Students with Study Quality higher than 5"
        value={this.getValue()}
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 35}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && `School average ${this.getSchoolAverage()}%`}
      />
    );
  }
}

export default observer(PerformanceGoalsStudyQualityHigherThanFiveContainer);
