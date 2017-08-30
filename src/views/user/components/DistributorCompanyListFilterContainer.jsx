import React from 'react';
import { observer } from 'mobx-react';
import DistributorCompanyListService from '../services/DistributorCompanyListService';
import DistributorCompanyListFilter from './DistributorCompanyListFilter';

const DistributorCompanyListFilterContainer = () => (
  <DistributorCompanyListFilter
    value={DistributorCompanyListService.filter}
    onChange={DistributorCompanyListService.handleFilterChange}
  />
);

export default observer(DistributorCompanyListFilterContainer);
