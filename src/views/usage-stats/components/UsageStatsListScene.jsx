import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import UsageStatsListContainer from './UsageStatsListContainer';
import UsageStatsListFilterContainer from './UsageStatsListFilterContainer';
import Separator from '../../../core/layout/Separator';
import DemoStudentListContainer from './DemoStudentListContainer';

const UsageStatsListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Usage Stats',
        },
      ]}
    />
    <Card
      title="Usage Stats"
    >
      <UsageStatsListFilterContainer />
      <UsageStatsListContainer />
    </Card>
    <Separator />
    {localStorage.role === 'ADMIN' && (
      <Card title="Demo Students">
        <DemoStudentListContainer />
      </Card>
    )}
  </div>
);

export default UsageStatsListScene;
