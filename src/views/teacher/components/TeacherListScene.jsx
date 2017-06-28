import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import TeacherListFilterContainer from './TeacherListFilterContainer';
import TeacherListContainer from './TeacherListContainer';
import FloatActionButton from '../../../core/form/FloatActionButton';

const TeacherListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Teachers
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
      onClick={() => browserHistory.push('/teachers/new')}
    />
    <Separator size="sm" />
    <TeacherListFilterContainer />
    <Separator size="sm" />
    <TeacherListContainer />
    <Separator size="sm" />
  </div>
);

export default TeacherListScene;
