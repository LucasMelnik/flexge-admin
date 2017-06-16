import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import UnitListFilterContainer from './UnitListFilterContainer';
import UnitListContainer from './UnitListContainer';
import UnitListPaginationContainer from './UnitListPaginationContainer';

const UnitListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Units
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
      onClick={() => browserHistory.push('/units/new')}
    />
    <Separator size="sm" />
    <UnitListFilterContainer />
    <Separator size="sm" />
    <UnitListContainer />
    <Separator size="sm" />
    <UnitListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default UnitListScene;
