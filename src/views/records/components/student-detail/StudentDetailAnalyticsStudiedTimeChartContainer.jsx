import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsStudiedTimeChart from './StudentDetailAnalyticsStudiedTimeChart';
import StudentStudiedTimeHistoryService from '../../services/StudentStudiedTimeHistoryService';

class StudentDetailAnalyticsStudiedTimeChartContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentStudiedTimeHistoryService = new StudentStudiedTimeHistoryService();
  componentWillMount() {
    this.studentStudiedTimeHistoryService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAnalyticsStudiedTimeChart
        data={toJS(this.studentStudiedTimeHistoryService.studiedTime)}
        loading={this.studentStudiedTimeHistoryService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailAnalyticsStudiedTimeChartContainer);
