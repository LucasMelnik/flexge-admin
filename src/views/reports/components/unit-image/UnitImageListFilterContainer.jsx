import React from 'react';
import { observer } from 'mobx-react';
import UnitImageRecordListService from '../../services/UnitImageRecordListService';
import UnitImageListFilter from './UnitImageListFilter';

const UnitImageListFilterContainer = () => (
  <UnitImageListFilter
    values={UnitImageRecordListService.form.getValues()}
    onChange={UnitImageRecordListService.form.setValue}
    onSearch={UnitImageRecordListService.load}
    fetching={UnitImageRecordListService.fetch.fetching}
  />
);

export default observer(UnitImageListFilterContainer);
