import React from 'react';
import { observer } from 'mobx-react';
import ModuleItemListService from '../services/ModuleItemListService';
import ModuleItemListFilter from './ModuleItemListFilter';

const ModuleItemListFilterContainer = props => (
  <ModuleItemListFilter
    onSearch={ModuleItemListService.load}
    onChange={ModuleItemListService.form.setValue}
    values={ModuleItemListService.form.getValues()}
    fetching={ModuleItemListService.fetch.fetching}
  />
);

export default observer(ModuleItemListFilterContainer);
