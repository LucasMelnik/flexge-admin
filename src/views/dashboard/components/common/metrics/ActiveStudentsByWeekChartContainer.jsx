import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByWeekService from '../../../services/ActiveStudentsByWeekService';
import ActiveStudentsByWeekChart from './ActiveStudentsByWeekChart';

class ActiveStudentsByWeekChartContainer extends Component {

  render() {
    return (
      <ActiveStudentsByWeekChart
        data={ActiveStudentsByWeekService.averageByPeriod}
        loading={ActiveStudentsByWeekService.fetch.fetching}
      />
    );
  }
}

export default observer(ActiveStudentsByWeekChartContainer);
