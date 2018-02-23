import React from 'react';
import { observer } from 'mobx-react';
import UsageStatsListService from '../services/UsageStatsListService';
import UsageStatsListFilter from './UsageStatsListFilter';

const UsageStatsListFilterContainer = () => (
  <UsageStatsListFilter
    values={UsageStatsListService.form.getValues()}
    onChange={UsageStatsListService.form.setValue}
    onSearch={UsageStatsListService.load}
    fetching={UsageStatsListService.fetch.fetching}
  />
);

export default observer(UsageStatsListFilterContainer);
