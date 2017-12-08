import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByWeekService from '../../services/ActiveStudentsByWeekService';
import CircularProgress from '../../../../core/layout/CircularProgress';

class PerformanceGoalsActiveStudentsContainer extends Component {
  componentWillMount() {
    ActiveStudentsByWeekService.load();
  }

  render() {
    return (
      <CircularProgress
        title="Active Students"
        tooltip="Students which studied at least once on last 30 days"
        fetching={ActiveStudentsByWeekService.fetch.fetching}
        noDataText="No Active Students Found"
        value={ActiveStudentsByWeekService.totalActiveStudents}
        max={100}
        successCondition={value => value > 85}
        badCondition={value => value <= 65}
        valueRender={value => `${value}%`}
        legend={`School Average ${ActiveStudentsByWeekService.schoolAverage}%`}
      />
    );
  }
}

export default observer(PerformanceGoalsActiveStudentsContainer);
