import React from 'react';
import Card from '../../../core-ant/Card';
import Separator from '../../../core/layout/Separator';
import ItemAudioListContainer from './ItemAudioListContainer';
import ItemAudioListFilterContainer from './ItemAudioListFilterContainer';

const ItemAudioListScene = () => (
  <div>
    <Card title="Items">
      <ItemAudioListFilterContainer />
      <br />
      <ItemAudioListContainer />
    </Card>
    <Separator />
  </div>
);

export default ItemAudioListScene;
