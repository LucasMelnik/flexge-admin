import React from 'react';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import ListFilter from './ListFilter';

const CompanyUserListSceneFilterContainer = () => (
  <ListFilter
    label="Filter the companies"
    placeholder="Start typing to filter the companies"
    value={CompanyListService.filter}
    onChange={CompanyListService.handleFilterChange}
  />
);

export default observer(CompanyUserListSceneFilterContainer);
