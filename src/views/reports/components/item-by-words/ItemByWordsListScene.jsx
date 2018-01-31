import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import ItemByWordsListContainer from './ItemByWordsListContainer';
import ItemByWordsListFilterContainer from './ItemByWordsListFilterContainer';

const ItemByWordsListScene = () => (
  <div>
    <Card title="Items by words">
      <ItemByWordsListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <ItemByWordsListContainer />
    </Card>
  </div>
);

export default ItemByWordsListScene;
