import React from 'react';
import { observer } from 'mobx-react';
import ItemTypeListService from '../services/ItemTypeListService';
import ItemTypeListFilter from './ItemTypeListFilter';

const ItemTypeListFilterContainer = () => (
  <ItemTypeListFilter
    value={ItemTypeListService.filter}
    onChange={ItemTypeListService.handleFilterChange}
  />
);

export default observer(ItemTypeListFilterContainer);
