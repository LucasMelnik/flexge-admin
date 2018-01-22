import React from 'react';
import { observer } from 'mobx-react';
import UnitItemExecutionStatsListFilter from './UnitItemExecutionStatsListFilter';
import UnitItemExecutionStatsListService from '../../services/UnitItemExecutionStatsListService';

const UnitItemExecutionStatsListFilterContainer = () => (
  <UnitItemExecutionStatsListFilter
    values={UnitItemExecutionStatsListService.form.getValues()}
    onChange={UnitItemExecutionStatsListService.form.setValue}
    onSearch={UnitItemExecutionStatsListService.load}
    fetching={UnitItemExecutionStatsListService.fetch.fetching}
  />
);

export default observer(UnitItemExecutionStatsListFilterContainer);
