import React from 'react';
import { observer } from 'mobx-react';
import StudentDetailAnalyticsOverviewRecord from './StudentDetailAnalyticsOverviewRecord';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';

const StudentDetailAnalyticsOverviewRecordContainer = () => (
  <StudentDetailAnalyticsOverviewRecord
    student={StudentOverviewRecordDetailService.student}
    fetching={
      StudentOverviewRecordDetailService.fetch.fetching ||
      !StudentOverviewRecordDetailService.student.id
    }
  />
);

export default observer(StudentDetailAnalyticsOverviewRecordContainer);
