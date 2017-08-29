import React from 'react';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import CompanyListFilter from './CompanyListFilter';

const CompanyListFilterContainer = () => (
  <CompanyListFilter
    value={CompanyListService.filter}
    onChange={CompanyListService.handleFilterChange}
  />
);

export default observer(CompanyListFilterContainer);
