import React from 'react';
import { observer } from 'mobx-react';
import GrammarListService from '../services/GrammarListService';
import GrammarListFilter from './GrammarListFilter';

const GrammarListFilterContainer = () => (
  <GrammarListFilter
    value={GrammarListService.filter}
    onChange={GrammarListService.handleFilterChange}
  />
);

export default observer(GrammarListFilterContainer);
