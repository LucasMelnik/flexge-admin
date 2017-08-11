import React from 'react';
import { observer } from 'mobx-react';
import ModuleListService from '../services/ModuleListService';
import ModuleListFilter from './ModuleListFilter';

const ModuleListFilterContainer = () => (
  <ModuleListFilter
    values={ModuleListService.form.getValues()}
    onChange={ModuleListService.form.setValue}
    onSearch={ModuleListService.load}
    fetching={ModuleListService.fetch.fetching}
  />
);

export default observer(ModuleListFilterContainer);
