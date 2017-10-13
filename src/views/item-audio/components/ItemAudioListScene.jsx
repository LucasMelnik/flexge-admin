import React from 'react';
import Card from '../../../core-ant/Card';
import Separator from '../../../core/layout/Separator';
import ItemAudioListContainer from './ItemAudioListContainer';

const ItemAudioListScene = () => (
  <div>
    <Card title="Items">
      <ItemAudioListContainer />
    </Card>
    <Separator />
  </div>
);

export default ItemAudioListScene;
