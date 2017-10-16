import React from 'react';
import { observer } from 'mobx-react';
import RegionListService from '../services/RegionListService';
import RegionListFilter from './RegionListFilter';

const RegionListFilterContainer = () => (
  <RegionListFilter
    value={RegionListService.filter}
    onChange={RegionListService.handleFilterChange}
  />
);

export default observer(RegionListFilterContainer);
