import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import CompanyListFilter from './CompanyListFilter';
import CompanyListContainer from './CompanyListContainer';
import CompanyListPaginationContainer from './CompanyListPaginationContainer';
import Button from '../../../core/form/Button';
import FloatActionButton from '../../../core/form/FloatActionButton';

const CompanyListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Company list
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="add"
      style={{ position: 'relative',
               float: 'right',
               top: 20,
               right: 20
             }}
      onClick={() => browserHistory.push('/companies/new')}
    />
    <Separator size="sm" />
    <CompanyListFilter />
    <Separator size="sm" />
    <CompanyListContainer />
    <Separator size="sm" />
    <CompanyListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default CompanyListScene;
