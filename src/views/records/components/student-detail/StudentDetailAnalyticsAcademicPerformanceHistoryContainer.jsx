import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsAcademicPerformanceHistory from './StudentDetailAnalyticsAcademicPerformanceHistory';
import StudentAcademicPerformanceHistoryService from '../../services/StudentAcademicPerformanceHistoryService';

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
        history={toJS(StudentAcademicPerformanceHistoryService.history)}
        loading={StudentAcademicPerformanceHistoryService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailAnalyticsAcademicPerformanceHistoryContainer);
