import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import ItemByWordCountLimitListContainer from './ItemByWordCountLimitListContainer';
import ItemByWordCountLimitListFilterContainer from './ItemByWordCountLimitListFilterContainer';

const ItemByWordCountLimitListScene = () => (
  <div>
    <Card title="Items by word count limit">
      <ItemByWordCountLimitListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <ItemByWordCountLimitListContainer />
    </Card>
  </div>
);

export default ItemByWordCountLimitListScene;
