import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ActiveStudentsByMonthChart from './ActiveStudentsByMonthChart';
import ActiveStudentsByMonthService from '../services/ActiveStudentsByMonthService';

class ActiveStudentsByMonthChartContainer extends React.PureComponent {

  componentDidMount() {
    ActiveStudentsByMonthService.load();
  }

  render() {
    return (
      <ActiveStudentsByMonthChart
        data={toJS(ActiveStudentsByMonthService.data)}
        loading={ActiveStudentsByMonthService.fetch.fetching}
      />
    );
  }
}

export default observer(ActiveStudentsByMonthChartContainer);
