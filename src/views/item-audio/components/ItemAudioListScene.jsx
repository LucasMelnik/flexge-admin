import React from 'react';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import ItemAudioListContainer from './ItemAudioListContainer';
import ItemAudioListFilterContainer from './ItemAudioListFilterContainer';
import ItemAudioStatusDialogContainer from './ItemAudioStatusDialogContainer';

const ItemAudioListScene = () => (
  <div>
    <Card title="Items">
      <ItemAudioListFilterContainer />
      <br />
      <ItemAudioListContainer />
    </Card>
    <Separator />
    <ItemAudioStatusDialogContainer />
  </div>
);

export default ItemAudioListScene;
