import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByWeekService from '../../services/ActiveStudentsByWeekService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsActiveStudentsLastSevenDaysContainer extends Component {

  render() {
    return (
      <CircularProgress
        fetching={ActiveStudentsByWeekService.fetch.fetching}
        noDataText="No students found"
        title="Active Students Last 7 days"
        tooltip="Students which studied in the last 7 days"
        value={ActiveStudentsByWeekService.studiedLast7Days}
        max={100}
        successCondition={value => value > 50}
        badCondition={value => value <= 35}
        valueRender={value => `${value}%`}
        legend={localStorage.role === 'TEACHER' && `School average ${ActiveStudentsByWeekService.schoolAverage}%`}
      />
    );
  }
}

export default observer(PerformanceGoalsActiveStudentsLastSevenDaysContainer);
