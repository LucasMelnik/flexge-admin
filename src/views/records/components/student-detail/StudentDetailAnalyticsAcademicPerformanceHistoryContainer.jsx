import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsAcademicPerformanceHistory from './StudentDetailAnalyticsAcademicPerformanceHistory';
import StudentAcademicPerformanceHistoryService from '../../services/StudentAcademicPerformanceHistoryService';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';

class StudentDetailAnalyticsAcademicPerformanceHistoryContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    StudentAcademicPerformanceHistoryService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAnalyticsAcademicPerformanceHistory
        student={StudentOverviewRecordDetailService.student}
        history={toJS(StudentAcademicPerformanceHistoryService.history)}
        loading={
          StudentAcademicPerformanceHistoryService.fetch.fetching ||
          StudentOverviewRecordDetailService.fetch.fetching ||
          !StudentOverviewRecordDetailService.student.id
        }
      />
    );
  }
}

export default observer(StudentDetailAnalyticsAcademicPerformanceHistoryContainer);
