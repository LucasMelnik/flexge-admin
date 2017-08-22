import React from 'react';
import { observer } from 'mobx-react';
import SchoolListService from '../services/SchoolListService';
import SchoolListFilter from './SchoolListFilter';

const SchoolListFilterContainer = () => (
  <SchoolListFilter
    value={SchoolListService.filter}
    onChange={SchoolListService.handleFilterChange}
  />
);

export default observer(SchoolListFilterContainer);
