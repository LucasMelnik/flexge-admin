import React from 'react';
import { observer } from 'mobx-react';
import UnitItemErrorRecordListService from '../../services/UnitItemErrorRecordListService';
import UnitItemErrorListFilter from './UnitItemErrorListFilter';

const UnitItemErrorListFilterContainer = () => (
  <UnitItemErrorListFilter
    values={UnitItemErrorRecordListService.form.getValues()}
    onChange={UnitItemErrorRecordListService.form.setValue}
    onSearch={UnitItemErrorRecordListService.load}
    onFilter={UnitItemErrorRecordListService.filter}
    fetching={UnitItemErrorRecordListService.fetch.fetching}
  />
);

export default observer(UnitItemErrorListFilterContainer);
