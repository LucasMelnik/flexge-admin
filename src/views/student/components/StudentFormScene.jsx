import React from 'react';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import StudentFormContainer from './StudentFormContainer';

const StudentFormScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Student information
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/students')}
    />
    <Separator size="sm" />
    <StudentFormContainer />
  </div>
);

export default StudentFormScene;
