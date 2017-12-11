import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import get from 'lodash/get';
import 'moment-duration-format';
import LastWeekAverageStudiedTimeService from '../../../services/LastWeekAverageStudiedTimeService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

const ActiveStudentsLastSevenDaysContainer = () => {
  const school = JSON.parse(localStorage.getItem('school'));
  return (
    <CircularProgress
      fetching={LastWeekAverageStudiedTimeService.fetch.fetching}
      noDataText="No data found"
      title="Average time last week"
      tooltip="Average studied time from Monday to Sunday last week"
      value={get(LastWeekAverageStudiedTimeService.fetch, 'data.averageStudiedTime')}
      max={school ? school.weeklyHoursRequired : 2}
      successCondition={value => value > school ? school.weeklyHoursRequired : 2}
      badCondition={value => value <= 0.999}
      valueRender={value => moment.duration(value, 'hours').format('hh:mm', { trim: false })}
      legend={localStorage.role === 'TEACHER' &&
        `School average ${
          moment.duration(get(LastWeekAverageStudiedTimeService.fetch, 'data.schoolAverageStudiedTime'), 'hours').format('hh:mm', { trim: false })}`
      }
    />
  );
};

export default observer(ActiveStudentsLastSevenDaysContainer);
