import React from 'react';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import Card from '../../../../core/layout/Card';
import SchoolReportListContainer from './SchoolReportListContainer';

const SchoolReportListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
        },
      ]}
    />
    <Card
      title="Schools Reports"
    >
      <SchoolReportListContainer />
    </Card>
  </div>
);

export default SchoolReportListScene;
