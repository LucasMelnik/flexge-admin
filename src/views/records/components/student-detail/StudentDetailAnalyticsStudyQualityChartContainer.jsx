import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsStudyQualityChart from './StudentDetailAnalyticsStudyQualityChart';
import StudentStudyQualityHistoryService from '../../services/StudentStudyQualityHistoryService';

class StudentDetailAnalyticsStudyQualityChartContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentStudyQualityHistoryService = new StudentStudyQualityHistoryService();
  componentWillMount() {
    this.studentStudyQualityHistoryService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailAnalyticsStudyQualityChart
        data={toJS(this.studentStudyQualityHistoryService.studyQualities)}
        loading={this.studentStudyQualityHistoryService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailAnalyticsStudyQualityChartContainer);
