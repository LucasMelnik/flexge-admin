import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import CompanyListFilter from './CompanyListFilter';
import CompanyListContainer from './CompanyListContainer';
import CompanyListPaginationContainer from './CompanyListPaginationContainer';
import Button from '../../../core/form/Button';

const CompanyListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Company list
      </Title>
    </InlineBlock>
    <InlineBlock
      marginLeft={10}
      verticalAlign="top"
    >
      <Button
        secondary
        label="New Company"
        onClick={() => browserHistory.push('/companies/new')}
        icon="add"
      />
    </InlineBlock>
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
