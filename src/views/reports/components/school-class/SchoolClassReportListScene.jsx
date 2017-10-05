import React from 'react';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import SchoolClassReportListContainer from './SchoolClassReportListContainer';

const SchoolClassReportListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Classes',
        },
      ]}
    />
    <Card
      title="School Classes Report"
    >
      <SchoolClassReportListContainer />
    </Card>
  </div>
);

export default SchoolClassReportListScene;
