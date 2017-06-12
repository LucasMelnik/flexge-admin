import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';
import CompanyListPaginationContainer from './CompanyListPaginationContainer';
import FloatActionButton from '../../../core/form/FloatActionButton';

const CompanyListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Companies
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="add"
      style={{ position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/companies/new')}
    />
    <Separator size="sm" />
    <CompanyListFilterContainer />
    <Separator size="sm" />
    <CompanyListContainer />
    <Separator size="sm" />
    <CompanyListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default CompanyListScene;
