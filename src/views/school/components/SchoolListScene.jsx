import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';

const SchoolListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Schools
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
      onClick={() => browserHistory.push('/schools/new')}
    />
    <Separator size="sm" />
    <SchoolListFilterContainer />
    <Separator size="sm" />
    <SchoolListContainer />
    <Separator size="sm" />
  </div>
);

export default SchoolListScene;
