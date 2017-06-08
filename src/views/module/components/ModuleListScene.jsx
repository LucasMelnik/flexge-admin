import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import ModuleListFilterContainer from './ModuleListFilterContainer';
import ModuleListContainer from './ModuleListContainer';
import ModuleListPaginationContainer from './ModuleListPaginationContainer';

const ModuleListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Modules
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
      onClick={() => browserHistory.push('/modules/new')}
    />
    <Separator size="sm" />
    <ModuleListFilterContainer />
    <Separator size="sm" />
    <ModuleListContainer />
    <Separator size="sm" />
    <ModuleListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default ModuleListScene;
