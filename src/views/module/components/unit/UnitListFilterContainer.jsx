import React from 'react';
import { observer } from 'mobx-react';
import UnitListService from '../../services/UnitListService';
import UnitListFilter from './UnitListFilter';

const UnitListFilterContainer = () => (
  <UnitListFilter
    values={UnitListService.form.getValues()}
    onChange={UnitListService.form.setValue}
    fetching={UnitListService.fetch.fetching}
    onSearch={UnitListService.load}
  />
);

export default observer(UnitListFilterContainer);
