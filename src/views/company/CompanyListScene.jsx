import React from 'react';
import Title from '../../core/content/Title';
import Separator from '../../core/layout/Separator';
import CompanyListFilter from './CompanyListFilter';
import CompanyList from './CompanyList';
import CompanyListPagination from './CompanyListPagination';

const CompanyListScene = () => (
  <div>
    <div>
      <Title>
        Company list
      </Title>
    </div>
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
