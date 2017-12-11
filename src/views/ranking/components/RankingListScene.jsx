import React from 'react';
import moment from 'moment';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import RegionalRankingListContainer from './RegionalRankingListContainer';
import NationalRankingListContainer from './NationalRankingListContainer';
import RankingListFilterContainer from './RankingListFilterContainer';
import Separator from '../../../core/layout/Separator';

const RankingListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${moment().format('MMMM')} Students Ranking`,
        },
      ]}
    />
    {(localStorage.role === 'ADMIN' || localStorage.role === 'COMPANY_MANAGER') && ([
      <Card key="card">
        <RankingListFilterContainer />
      </Card>,
      <Separator key="separator" />,
    ])}
    <Row>
      <Column size={6}>
        <Card title="Regional Ranking">
          <RegionalRankingListContainer />
        </Card>
      </Column>
      <Column size={6}>
        <Card title="National Ranking">
          <NationalRankingListContainer />
        </Card>
      </Column>
    </Row>
  </div>
);

export default RankingListScene;
