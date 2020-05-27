import React from 'react';
import { observer } from 'mobx-react';
import DistributorManagerDashboardFilter from './DistributorManagerDashboardFilter';
import DistributorManagerDashboardFilterService from '../../services/DistributorManagerDashboardFilterService';

const DistributorManagerDashboardFilterContainer = () => (
  <DistributorManagerDashboardFilter
    values={DistributorManagerDashboardFilterService.form.getValues()}
    onChange={DistributorManagerDashboardFilterService.form.setValue}
    errors={DistributorManagerDashboardFilterService.form.errors}
  />
);

export default observer(DistributorManagerDashboardFilterContainer);
