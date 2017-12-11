import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import WeeklyStudyTimeChart from './WeeklyStudyTimeChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

class WeeklyStudyTimeChartContainer extends Component {

  dataService = new WeekStatsByPeriodService();

  componentWillMount() {
    this.dataService.load(
      moment().startOf('year').toDate(),
      moment().endOf('year').toDate(),
    );
  }

  render() {
    return (
      <WeeklyStudyTimeChart
        data={this.dataService.data}
        loading={this.dataService.fetch.fetching}
      />
    );
  }
}

export default observer(WeeklyStudyTimeChartContainer);
