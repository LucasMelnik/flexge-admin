import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import UsageStatsListContainer from './UsageStatsListContainer';
import UsageStatsListFilterContainer from './UsageStatsListFilterContainer';

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
  </div>
);

export default UsageStatsListScene;
