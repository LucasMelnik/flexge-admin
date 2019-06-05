import React from 'react';
import { observer } from 'mobx-react';
import UserListFilterService from '../services/UserListFilterService';
import DistributorUserListFilter from './DistributorUserListFilter';

const DistributorUserListFilterContainer = () => (
  <DistributorUserListFilter
    values={UserListFilterService.form.getValues()}
    onChange={UserListFilterService.form.setValue}
    onSearch={UserListFilterService.onSearch}
  />
);

export default observer(DistributorUserListFilterContainer);
