import React from 'react';
import { observer } from 'mobx-react';
import FunctionOfLanguageListService from '../services/FunctionOfLanguageListService';
import FunctionOfLanguageListFilter from './FunctionOfLanguageListFilter';

const FunctionOfLanguageListFilterContainer = () => (
  <FunctionOfLanguageListFilter
    value={FunctionOfLanguageListService.filter}
    onChange={FunctionOfLanguageListService.handleFilterChange}
  />
);

export default observer(FunctionOfLanguageListFilterContainer);
