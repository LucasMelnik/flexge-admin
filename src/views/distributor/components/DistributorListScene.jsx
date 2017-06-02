import React from 'react';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import DistributorListFilter from './DistributorListFilter';
import DistributorListContainer from './DistributorListContainer';
import DistributorListPaginationContainer from './DistributorListPaginationContainer';
import Button from '../../../core/form/Button';

const DistributorListScene = () => (
  <div>
    <InlineBlock>
      <Title>
        Distributor list
      </Title>
    </InlineBlock>
    <InlineBlock
      marginLeft={10}
      verticalAlign="top"
    >
      <Button
        secondary
        label="New Distributor"
        onClick={() => browserHistory.push('/distributors/new')}
        icon="add"
      />
    </InlineBlock>
    <Separator size="sm" />
    <DistributorListFilter />
    <Separator size="sm" />
    <DistributorListContainer />
    <Separator size="sm" />
    <DistributorListPaginationContainer />
    <Separator size="sm" />
  </div>
);

export default DistributorListScene;
