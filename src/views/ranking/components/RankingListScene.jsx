import React from 'react';
import moment from 'moment';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import RankingListFilterContainer from './RankingListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Tabs from '../../../core/layout/Tabs';
import RankingListPanelContainer from './RankingListPanelContainer';

const RankingListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Students Ranking',
        },
      ]}
    />
    {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && ([
      <Card key="card">
        <RankingListFilterContainer />
      </Card>,
      <Separator key="separator" />,
    ])}
    <Tabs
      tabs={[
        {
          title: `Top of ${moment().format('MMMM')}`,
          content: <RankingListPanelContainer type="month" />,
        },
        {
          title: 'Top of Semester',
          content: <RankingListPanelContainer type="semester" />,
        },
        {
          title: 'Top of Year',
          content: <RankingListPanelContainer type="year" />,
        },
        {
          title: 'Top of All time',
          content: <RankingListPanelContainer type="all" />,
        },
      ]}
    />
  </div>
);

export default RankingListScene;
