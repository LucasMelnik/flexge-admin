import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import ModuleListContainer from './ModuleListContainer';

const ModuleListScene = () => (
  <div>
    <InlineBlock height={70} />
    <InlineBlock
      float="right"
      marginTop={15}
    >
      <Button
        icon="add"
        primary
        onClick={() => browserHistory.push('/modules/new')}
        label="New module"
      />
    </InlineBlock>
    <ModuleListContainer />
    <Separator />
  </div>
);

export default ModuleListScene;
