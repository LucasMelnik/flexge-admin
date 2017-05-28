import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../core/content/Title';
import Separator from '../../core/layout/Separator';
import CompanyListFilter from './CompanyListFilter';
import CompanyList from './CompanyList';
import CompanyListPagination from './CompanyListPagination';
import Button from '../../core/form/Button';

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
        primary
        label="New Company"
        onClick={() => browserHistory.push('/companies/new')}
        icon="add"
      />
    </InlineBlock>

    <Separator size="sm" />
    <CompanyListFilter />
    <Separator size="sm" />
    <CompanyList
      fetching={false}
      companies={[
        {
          id: 1,
          name: 'Bertoni',
        },
        {
          id: 2,
          name: 'Uniamérica',
        },
      ]}
    />
    <Separator size="sm" />
    <CompanyListPagination
      pageCount={1}
      onPageChange={() => alert('page changed')}
    />
    <Separator size="sm" />
  </div>
);

export default CompanyListScene;
