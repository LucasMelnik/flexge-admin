import React from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

const ActiveStudentsLastSevenDaysContainer = () => (
  <CircularProgress
    fetching={ActiveStudentsByPeriodService.fetch.fetching}
    noDataText="No students found"
    title="Active Students 7 days"
    tooltip="Students which studied at least once in the last 7 days"
    value={ActiveStudentsByPeriodService.studiedLast7Days ?
      Number(ActiveStudentsByPeriodService.studiedLast7Days.toFixed(0)) : 0
    }
    max={100}
    successCondition={value => value > 50}
    badCondition={value => value <= 35}
    valueRender={value => `${value}%`}
    legend={localStorage.role === 'TEACHER' && `School average ${ActiveStudentsByPeriodService.schoolAverage}%`}
  />
);

export default observer(ActiveStudentsLastSevenDaysContainer);
