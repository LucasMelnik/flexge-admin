import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import WeeklyStudyQualityChart from './WeeklyStudyQualityChart';
import AverageStudyQualityByPeriodService from '../../../services/AverageStudyQualityByPeriodService';

class WeeklyStudyQualityChartContainer extends Component {
  componentWillMount() {
    AverageStudyQualityByPeriodService.load(
      moment().startOf('year').toDate(),
      moment().endOf('year').toDate(),
    );
  }

  render() {
    return (
      <WeeklyStudyQualityChart
        data={AverageStudyQualityByPeriodService.data}
        loading={AverageStudyQualityByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(WeeklyStudyQualityChartContainer);
