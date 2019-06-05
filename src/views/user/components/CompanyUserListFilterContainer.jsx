import React from 'react';
import { observer } from 'mobx-react';
import CompanyUserListFilter from './CompanyUserListFilter';
import UserListFilterService from '../services/UserListFilterService';

const CompanyUserListFilterContainer = () => (
  <CompanyUserListFilter
    values={UserListFilterService.form.getValues()}
    onChange={UserListFilterService.form.setValue}
    onSearch={UserListFilterService.onSearch}
  />
);

export default observer(CompanyUserListFilterContainer);
