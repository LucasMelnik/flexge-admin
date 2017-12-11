import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import HistoryListFilter from './HistoryListFilter';
import HistoryListFilterService from '../../../services/HistoryListFilterService';

const HistoryListFilterContainer = () => {
  console.log('year', toJS(HistoryListFilterService.year))
  return (
    <HistoryListFilter
      year={HistoryListFilterService.year}
      onChange={HistoryListFilterService.changeYear}
    />
  );
}

export default observer(HistoryListFilterContainer);
