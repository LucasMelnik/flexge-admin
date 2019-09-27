import React from 'react';
import { observer } from 'mobx-react';
import SuspectUsageAlertListFilter from './SuspectUsageAlertListFilter';
import SuspectUsageAlertListService from '../services/SuspectUsageAlertListService';

const SuspectUsageAlertListFilterContainer = () => (
  <SuspectUsageAlertListFilter
    values={SuspectUsageAlertListService.form.getValues()}
    errors={SuspectUsageAlertListService.form.errors}
    onChange={SuspectUsageAlertListService.form.setValue}
    onSubmit={SuspectUsageAlertListService.load}
    fetching={SuspectUsageAlertListService.fetch.fetching}
  />
);

export default observer(SuspectUsageAlertListFilterContainer);
