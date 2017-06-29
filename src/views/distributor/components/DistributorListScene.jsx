import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import DistributorListFilterContainer from './DistributorListFilterContainer';
import DistributorListContainer from './DistributorListContainer';

const DistributorListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Distributors
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
          onClick={() => browserHistory.push('/distributors/new')}
      />
    <Separator size="sm" />
    <DistributorListFilterContainer />
    <Separator size="sm" />
    <DistributorListContainer />
    <Separator size="sm" />
  </div>
);

export default DistributorListScene;
