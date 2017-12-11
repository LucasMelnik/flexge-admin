import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import WeeklyStudyingStudentsChart from './WeeklyStudyingStudentsChart';
import WeekStatsByPeriodService from '../../../services/WeekStatsByPeriodService';

class WeeklyStudyingStudentsChartContainer extends Component {
  componentWillMount() {
    WeekStatsByPeriodService.load(
      moment().startOf('year').toDate(),
      moment().endOf('year').toDate(),
    );
  }

  render() {
    return (
      <WeeklyStudyingStudentsChart
        data={WeekStatsByPeriodService.data}
        loading={WeekStatsByPeriodService.fetch.fetching}
      />
    );
  }
}

export default observer(WeeklyStudyingStudentsChartContainer);
