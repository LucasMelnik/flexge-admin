import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import SchoolListFilter from './SchoolListFilter';
import SchoolListContainer from './SchoolListContainer';
import SchoolListPaginationContainer from './SchoolListPaginationContainer';

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
        secondary
        label="New School"
        onClick={() => browserHistory.push('/schools/new')}
        icon="add"
      />
    </InlineBlock>
    <Separator size="sm" />
    <SchoolListFilter />
    <Separator size="sm" />
    <SchoolListContainer />
    <Separator size="sm" />
    <SchoolListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default SchoolListScene;
