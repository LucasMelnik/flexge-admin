import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByWeekService from '../../services/ActiveStudentsByWeekService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsActiveStudentsContainer extends Component {
  componentWillMount() {
    ActiveStudentsByWeekService.load();
  }

  getTotalSchoolActiveStudents = (classes) => {
    const periods = [7, 14, 21, 30];
    return classes.reduce((acc, schoolClass) => (
      acc + periods.reduce((classAcc, period) => classAcc + schoolClass[`studyOnLast${period}Days`] || 0, 0)
    ), 0);
  }

  getTotalStudents = classes => (
    classes.reduce((acc, schoolClass) => acc + schoolClass.totalStudents, 0)
  )

  getValue = () => {
    if (ActiveStudentsByWeekService.fetch.feching) {
      return 0;
    }
    if (localStorage.role === 'TEACHER' || localStorage.role === 'SCHOOL_MANAGER') {
      const school = ActiveStudentsByWeekService.activeStudentsByWeek[0];
      if (!school) {
        return null;
      }
      const activeStudents = this.getTotalSchoolActiveStudents(school.classes);
      const totalStudents = this.getTotalStudents(school.classes);
      return activeStudents / totalStudents * 100;
    }
    const schools = ActiveStudentsByWeekService.activeStudentsByWeek;
    if (!schools.length) {
      return null;
    }
    const allSchoolsActiveStudents = schools.reduce((acc, school) => (
      acc + this.getTotalSchoolActiveStudents(school.classes)
    ), 0);
    const allSchoolsStudents = schools.reduce((acc, school) => acc + school.totalStudents, 0);
    return allSchoolsActiveStudents / allSchoolsStudents;
  };

  getSchoolAverage = () => {
    if (ActiveStudentsByWeekService.fetch.fetching) return null;
    const studyingStudents =
      ActiveStudentsByWeekService.activeStudentsByWeek[0].totalStudents -
      ActiveStudentsByWeekService.activeStudentsByWeek[0].noStudy;
    return studyingStudents / ActiveStudentsByWeekService.activeStudentsByWeek[0].totalStudents * 100;
  }


  render() {
    return (
      <CircularProgress
        title="Active Students"
        tooltip="Students which studied at least once on last 30 days"
        fetching={ActiveStudentsByWeekService.fetch.fetching}
        noDataText="No Active Students Found"
        value={this.getValue()}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={`School Average ${this.getSchoolAverage()}%`}
      />
    );
  }
}

export default observer(PerformanceGoalsActiveStudentsContainer);
