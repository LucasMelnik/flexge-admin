import React from 'react';
import { observer } from 'mobx-react';
import UserAdminListService from '../services/UserAdminListService';
import UserAdminListFilter from './UserAdminListFilter';

const UserAdminListFilterContainer = () => (
  <UserAdminListFilter
    value={UserAdminListService.filter}
    onChange={UserAdminListService.handleFilterChange}
  />
);

export default observer(UserAdminListFilterContainer);
