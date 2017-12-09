import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import WeeklyStudyTimeChart from './WeeklyStudyTimeChart';
import WeekStatsByPeriodService from '../../services/WeekStatsByPeriodService';

class WeeklyStudyTimeChartContainer extends Component {

  weekStatsByPeriodService = new WeekStatsByPeriodService();

  componentWillMount() {
    this.weekStatsByPeriodService.load(
      moment().startOf('year').toDate(),
      moment().endOf('year').toDate(),
    );
  }

  render() {
    return (
      <WeeklyStudyTimeChart
        data={this.weekStatsByPeriodService.weekStatsByPeriod}
        loading={this.weekStatsByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(WeeklyStudyTimeChartContainer);
