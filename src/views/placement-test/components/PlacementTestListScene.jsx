import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import PlacementTestListContainer from './PlacementTestListContainer';

const PlacementTestListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Placement Test
      </Title>
    </InlineBlock>
    <Button
      primary
      icon="add"
      label="New Grammar"
      style={{
        position: 'relative',
        float: 'right',
      }}
      onClick={() => browserHistory.push('/placement-test/new')}
    />
    <Separator size="sm" />
    <PlacementTestListContainer />
    <Separator size="sm" />
  </div>
);

export default PlacementTestListScene;
