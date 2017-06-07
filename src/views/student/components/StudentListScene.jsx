import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import StudentListFilterContainer from './StudentListFilterContainer';
import StudentListContainer from './StudentListContainer';
import StudentListPaginationContainer from './StudentListPaginationContainer';

const StudentListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Students
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
      onClick={() => browserHistory.push('/students/new')}
    />
    <Separator size="sm" />
    <StudentListFilterContainer />
    <Separator size="sm" />
    <StudentListContainer />
    <Separator size="sm" />
    <StudentListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default StudentListScene;
