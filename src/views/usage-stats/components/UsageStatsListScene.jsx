import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
import UsageStatsListContainer from './UsageStatsListContainer';
import UsageStatsFilterContainer from './UsageStatsFilterContainer';
import DemoStudentListContainer from './DemoStudentListContainer';
import { Roles } from '../../../core/util';

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
      <UsageStatsFilterContainer />
      <UsageStatsListContainer />
    </Card>
    <Separator />
    {[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER].some(r => r === localStorage.role) && (
      <Card title="Demo Students">
        <DemoStudentListContainer />
      </Card>
    )}
  </div>
);

export default UsageStatsListScene;
