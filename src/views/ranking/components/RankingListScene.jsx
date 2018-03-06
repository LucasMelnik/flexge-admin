import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import RankingListFilterContainer from './RankingListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Tabs from '../../../core/layout/Tabs';
import RankingListPanelContainer from './RankingListPanelContainer';
import MonthRankingFilterContainer from './MonthRankingFilterContainer';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

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
          title: (
            <div
              style={{
                display: 'flex',
                marginBottom: -25,
              }}
            >
              <span style={{ marginTop: 5 }}>
                Top of
              </span>
              <ColumnSeparator size="xs" />
              <MonthRankingFilterContainer />
            </div>
           ),
          key: 'monthly',
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
