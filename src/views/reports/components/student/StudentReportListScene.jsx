import React from 'react';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import Card from '../../../../core/layout/Card';
import StudentReportListContainer from './StudentReportListContainer';

const StudentReportListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Students',
        },
      ]}
    />
    <Card
      title="Students Reports"
    >
      <StudentReportListContainer />
    </Card>
  </div>
);

export default StudentReportListScene;
