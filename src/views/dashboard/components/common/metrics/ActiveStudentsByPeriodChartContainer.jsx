import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import ActiveStudentsByPeriodChart from './ActiveStudentsByPeriodChart';

class ActiveStudentsByPeriodChartContainer extends Component {

  render() {
    return (
      <ActiveStudentsByPeriodChart
        data={ActiveStudentsByPeriodService.averageByPeriod}
        loading={ActiveStudentsByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(ActiveStudentsByPeriodChartContainer);
