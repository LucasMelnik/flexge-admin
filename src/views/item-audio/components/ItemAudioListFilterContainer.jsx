import React from 'react';
import { observer } from 'mobx-react';
import ItemAudioListService from '../services/ItemAudioListService';
import ItemAudioListFilter from './ItemAudioListFilter';

const ItemAudioListFilterContainer = () => (
  <ItemAudioListFilter
    values={ItemAudioListService.form.getValues()}
    onChange={ItemAudioListService.form.setValue}
    onSearch={ItemAudioListService.load}
    fetching={ItemAudioListService.fetch.fetching}
  />
);

export default observer(ItemAudioListFilterContainer);
