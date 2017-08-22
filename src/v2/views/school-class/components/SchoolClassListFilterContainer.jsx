import React from 'react';
import { observer } from 'mobx-react';
import SchoolClassListService from '../services/SchoolClassListService';
import SchoolClassListFilter from './SchoolClassListFilter';

const SchoolClassListFilterContainer = () => (
  <SchoolClassListFilter
    value={SchoolClassListService.filter}
    onChange={SchoolClassListService.handleFilterChange}
  />
);

export default observer(SchoolClassListFilterContainer);
