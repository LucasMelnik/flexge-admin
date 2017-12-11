import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsStudiedTimeChart from './StudentDetailAnalyticsStudiedTimeChart';
import StudentHistoryRecordDetailService from '../../services/StudentHistoryRecordDetailService';

class StudentDetailAnalyticsStudiedTimeChartContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentHistoryRecordDetailService = new StudentHistoryRecordDetailService();
  componentWillMount() {
    this.studentHistoryRecordDetailService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAnalyticsStudiedTimeChart
        data={toJS(this.studentHistoryRecordDetailService.studiedTime)}
        loading={this.studentHistoryRecordDetailService.fetchStudiedTime.fetching}
      />
    );
  }
}

export default observer(StudentDetailAnalyticsStudiedTimeChartContainer);
