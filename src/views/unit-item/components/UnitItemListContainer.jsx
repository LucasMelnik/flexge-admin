import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemList from './UnitItemList';
import UnitItemListService from '../services/UnitItemListService';

const UnitItemListContainer = () => (
  <UnitItemList
    items={toJS(UnitItemListService.items)}
    fetching={UnitItemListService.fetch.fetching}
    onDelete={UnitItemListService.handleRemove}
    onSelect={UnitItemListService.handleSelect}
  />
);

export default observer(UnitItemListContainer);
