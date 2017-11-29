import React from 'react';
import { observer } from 'mobx-react';
import DashboardFilter from './DashboardFilter';
import DashboardFilterFormService from '../../services/admin/DashboardFilterFormService';

const DashboardFilterContainer = () => (
  <DashboardFilter
    onChange={DashboardFilterFormService.onChange}
    values={DashboardFilterFormService.form.getValues()}
  />
);

export default observer(DashboardFilterContainer);