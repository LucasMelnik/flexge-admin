import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ItemList from './ItemList';
import ItemListService from '../services/ItemListService';

const ItemListContainer = () => (
  <ItemList
    items={toJS(ItemListService.items)}
    fetching={ItemListService.fetch.fetching}
    onDelete={ItemListService.handleRemove}
    onSelect={ItemListService.handleSelect}
  />
);

export default observer(ItemListContainer);
