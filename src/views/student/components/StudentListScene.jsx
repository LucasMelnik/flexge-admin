import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import StudentListFilter from './StudentListFilter';
import StudentListContainer from './StudentListContainer';
import StudentListPaginationContainer from './StudentListPaginationContainer';
import Button from '../../../core/form/Button';

const StudentListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Student list
      </Title>
    </InlineBlock>
    <InlineBlock
      marginLeft={10}
      verticalAlign="top"
    >
      <Button
        secondary
        label="New Student"
        onClick={() => browserHistory.push('/students/new')}
        icon="add"
      />
    </InlineBlock>
    <Separator size="sm" />
    <StudentListFilter />
    <Separator size="sm" />
    <StudentListContainer />
    <Separator size="sm" />
    <StudentListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default StudentListScene;
