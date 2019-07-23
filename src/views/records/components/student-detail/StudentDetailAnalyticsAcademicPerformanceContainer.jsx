import React from 'react';
import { observer } from 'mobx-react';
import StudentAcademicPerformanceHistoryService from '../../services/StudentAcademicPerformanceHistoryService';
import StudentDetailAnalyticsAcademicPerformance from './StudentDetailAnalyticsAcademicPerformance';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';

const StudentDetailAnalyticsAcademicPerformanceContainer = () => (
  <StudentDetailAnalyticsAcademicPerformance
    student={StudentOverviewRecordDetailService.student}
    currentPerformance={StudentAcademicPerformanceHistoryService.currentPerformance || {}}
    loading={
      StudentAcademicPerformanceHistoryService.fetch.fetching ||
      StudentOverviewRecordDetailService.fetch.fetching ||
      !StudentOverviewRecordDetailService.student.id
    }
  />
);

export default observer(StudentDetailAnalyticsAcademicPerformanceContainer);
