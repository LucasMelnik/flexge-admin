import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../core/content/Title';
import Separator from '../../core/layout/Separator';
import Button from '../../core/form/Button';
import SchoolListFilter from './SchoolListFilter';
import SchoolList from './SchoolList';
import SchoolListPagination from './SchoolListPagination';

const SchoolListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        School list
      </Title>
    </InlineBlock>
    <InlineBlock
      marginLeft={10}
      verticalAlign="top"
    >
      <Button
        primary
        label="New School"
        onClick={() => browserHistory.push('/schools/new')}
        icon="add"
      />
    </InlineBlock>
    <Separator size="sm" />
    <SchoolListFilter />
    <Separator size="sm" />
    <SchoolList
      fetching={false}
      schools={[
        {
          id: 1,
          name: 'Bertoni Foz',
          company: 'Bertoni',
        },
        {
          id: 2,
          name: 'Bertoni Medianeira',
          company: 'Bertoni',
        },
        {
          id: 3,
          name: 'Uniamérica foz',
          company: 'Uniamérica',
        },
        {
          id: 4,
          name: 'Uniamérica medianeira',
          company: 'Uniamérica',
        },
      ]}
    />
    <Separator size="sm" />
    <SchoolListPagination
      pageCount={1}
      onPageChange={() => alert('page changed')}
    />
    <Separator size="sm" />
  </div>
);

export default SchoolListScene;
