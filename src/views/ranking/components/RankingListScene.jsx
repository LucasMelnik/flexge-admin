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
    <Card key="card">
      <RankingListFilterContainer />
    </Card>
    <Separator key="separator" />
    <Tabs
      tabs={[
        {
          title: (
            <div
              style={{
                width: 200,
                marginBottom: -25,
              }}
            >
              <span style={{ marginTop: 5, display: 'inline-block' }}>
                Top of
              </span>
              <ColumnSeparator size="xs" />
              <div style={{ display: 'inline-block', width: '75%' }}>
                <MonthRankingFilterContainer />
              </div>
            </div>
           ),
          key: 'monthly',
          content: <RankingListPanelContainer type="month" />,
        },
        {
          title: 'Top of Semester',
          key: 'semester',
          content: <RankingListPanelContainer type="semester" />,
        },
        {
          title: 'Top of Year',
          key: 'year',
          content: <RankingListPanelContainer type="year" />,
        },
        {
          key: 'all',
          title: 'Top of All time',
          content: <RankingListPanelContainer type="all" />,
        },
      ]}
    />
  </div>
);

export default RankingListScene;
