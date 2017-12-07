import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByWeekService from '../../services/ActiveStudentsByWeekService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsActiveStudentsContainer extends Component {

  componentWillMount() {
    ActiveStudentsByWeekService.load();
  }

  getValue = () => {
    // if (ActiveStudentsByWeekService.loadingStudyQualityScores) {
    //   return 0;
    // }
    // if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
    //   const school = ActiveStudentsByWeekService.schoolStudyQualityScores[0];
    //   if (!school) {
    //     return null;
    //   }
    //   return (
    //     school.classes.reduce((acc, schoolClass) => acc + schoolClass.classAverageScore, 0) /
    //     school.classes.length
    //   ) + 5;
    // }
    // const schools = ActiveStudentsByWeekService.schoolStudyQualityScores;
    // if (!schools.length) {
    //   return null;
    // }
    // return (schools.reduce((acc, schoolScore) => acc + schoolScore.schoolAverageScore, 0) / schools.length) + 5;
  };

  // getSchoolAverage = () => !ActiveStudentsByWeekService.loadingStudyQualityScores &&
  //   ActiveStudentsByWeekService.schoolStudyQualityScores[0] &&
  //   ActiveStudentsByWeekService.schoolStudyQualityScores[0].schoolAverageScore;

  render() {
    return (
      <CircularProgress
        title="Active Students"
        tooltip="Students which studied at least once on last 30 days"
        fetching={ActiveStudentsByWeekService.fetch.fetching}
        noDataText="No Active Students Found"
        value={74}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && 'School average 55%'}
      />
    );
  }
}

{/* <CircularProgress
  fetching={ActiveStudentsByWeekService.loadingStudyQualityScores}
  noDataText="No Active Students Found"
  title="Study Quality"
  tooltip="Your classes average"
  value={this.getValue()}
  max={20}
  valueRender={value => value - 5}
  successCondition={value => value > 10}
  badCondition={value => value < 5}
  legend={localStorage.role === 'TEACHER' && `School average ${this.getSchoolAverage()}`}
/> */}

export default observer(PerformanceGoalsActiveStudentsContainer);
