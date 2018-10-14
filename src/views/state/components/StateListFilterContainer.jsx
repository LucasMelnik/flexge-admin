import React from 'react';
import { observer } from 'mobx-react';
import StateListService from '../services/StateListService';
import StateListFilter from './StateListFilter';

const StateListFilterContainer = () => (
  <StateListFilter
    value={StateListService.filter}
    onChange={StateListService.handleFilterChange}
  />
);

export default observer(StateListFilterContainer);
