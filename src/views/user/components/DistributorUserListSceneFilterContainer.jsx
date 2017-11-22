import React from 'react';
import { observer } from 'mobx-react';
import DistributorListService from '../services/DistributorListService';
import ListFilter from './ListFilter';

const DistributorUserListSceneFilterContainer = () => (
  <ListFilter
    label="Filter the distributors"
    placeholder="Start typing to filter the distributors"
    value={DistributorListService.filter}
    onChange={DistributorListService.handleFilterChange}
  />
);

export default observer(DistributorUserListSceneFilterContainer);
