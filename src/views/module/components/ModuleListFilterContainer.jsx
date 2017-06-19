import React from 'react';
import { observer } from 'mobx-react';
import ModuleListService from '../services/ModuleListService';
import ModuleListFilter from './ModuleListFilter';

const ModuleListFilterContainer = () => (
  <ModuleListFilter
    value={ModuleListService.filter}
    onChange={ModuleListService.handleFilterChange}
    onSearch={ModuleListService.load}
    fetching={ModuleListService.fetch.fetching}
  />
);

export default observer(ModuleListFilterContainer);
