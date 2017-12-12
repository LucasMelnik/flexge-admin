import React from 'react';
import { observer } from 'mobx-react';
import StudentAcademicPerformanceHistoryService from '../../services/StudentAcademicPerformanceHistoryService';
import StudentDetailAnalyticsAcademicPerformance from './StudentDetailAnalyticsAcademicPerformance';

const StudentDetailAnalyticsAcademicPerformanceContainer = () => (
  <StudentDetailAnalyticsAcademicPerformance
    currentPerformance={StudentAcademicPerformanceHistoryService.currentPerformance}
    loading={StudentAcademicPerformanceHistoryService.fetch.fetching}
  />
);

export default observer(StudentDetailAnalyticsAcademicPerformanceContainer);
