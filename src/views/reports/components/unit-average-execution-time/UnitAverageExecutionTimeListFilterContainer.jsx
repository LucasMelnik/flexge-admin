import React from 'react';
import { observer } from 'mobx-react';
import UnitAverageExecutionTimeListFilter from './UnitAverageExecutionTimeListFilter';
import UnitAverageExecutionTimeListService from '../../services/UnitAverageExecutionTimeListService';

const UnitAverageExecutionTimeListFilterContainer = () => (
  <UnitAverageExecutionTimeListFilter
    values={UnitAverageExecutionTimeListService.form.getValues()}
    onChange={UnitAverageExecutionTimeListService.form.setValue}
    onSubmit={UnitAverageExecutionTimeListService.load}
    fetching={UnitAverageExecutionTimeListService.fetch.fetching}
  />
);

export default observer(UnitAverageExecutionTimeListFilterContainer);
