import React from 'react';
import { observer } from 'mobx-react';
import SchoolRecordListService from '../../services/SchoolRecordListService';
import SchoolRecordListFilter from './SchoolRecordListFilter';

const SchoolRecordListFilterContainer = () => (
  <SchoolRecordListFilter
    values={SchoolRecordListService.form.getValues()}
    onChange={SchoolRecordListService.form.setValue}
    onSearch={SchoolRecordListService.load}
    fetching={SchoolRecordListService.fetch.fetching}
  />
);

export default observer(SchoolRecordListFilterContainer);
