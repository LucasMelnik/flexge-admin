import React from 'react';
import { observer } from 'mobx-react';
import DistributorListService from '../services/DistributorListService';
import DistributorListFilter from './DistributorListFilter';

const DistributorListFilterContainer = () => (
  <DistributorListFilter
    value={DistributorListService.filter}
    onChange={DistributorListService.handleFilterChange}
  />
);

export default observer(DistributorListFilterContainer);
