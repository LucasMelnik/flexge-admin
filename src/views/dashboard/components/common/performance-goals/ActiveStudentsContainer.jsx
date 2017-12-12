import React from 'react';
import { observer } from 'mobx-react';
import ActiveStudentsByPeriodService from '../../../services/ActiveStudentsByPeriodService';
import CircularProgress from '../../../../../core/layout/CircularProgress';

const ActiveStudentsContainer = () => (
  <CircularProgress
    title="Active Students"
    tooltip="Students which studied at least once on last 30 days"
    fetching={ActiveStudentsByPeriodService.fetch.fetching}
    noDataText="No Active Students Found"
    value={Number(ActiveStudentsByPeriodService.totalActiveStudents.toFixed(0))}
    max={100}
    successCondition={value => value > 85}
    badCondition={value => value <= 65}
    valueRender={value => `${value}%`}
    legend={`School Average ${ActiveStudentsByPeriodService.schoolAverage}%`}
  />
);

export default observer(ActiveStudentsContainer);
