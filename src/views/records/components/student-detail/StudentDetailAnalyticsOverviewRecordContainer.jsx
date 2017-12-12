import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsOverviewRecord from './StudentDetailAnalyticsOverviewRecord';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';

class StudentDetailAnalyticsOverviewRecordContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentOverviewRecordDetailService = new StudentOverviewRecordDetailService();
  componentWillMount() {
    this.studentOverviewRecordDetailService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAnalyticsOverviewRecord
        student={this.studentOverviewRecordDetailService.student}
        fetching={
          this.studentOverviewRecordDetailService.fetch.fetching ||
          !this.studentOverviewRecordDetailService.student.id
        }
      />
    );
  }
}

export default observer(StudentDetailAnalyticsOverviewRecordContainer);
