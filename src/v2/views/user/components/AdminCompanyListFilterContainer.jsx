import React from 'react';
import { observer } from 'mobx-react';
import AdminCompanyListService from '../services/AdminCompanyListService';
import AdminCompanyListFilter from './AdminCompanyListFilter';

const AdminCompanyListFilterContainer = () => (
  <AdminCompanyListFilter
    value={AdminCompanyListService.filter}
    onChange={AdminCompanyListService.handleFilterChange}
  />
);

export default observer(AdminCompanyListFilterContainer);
