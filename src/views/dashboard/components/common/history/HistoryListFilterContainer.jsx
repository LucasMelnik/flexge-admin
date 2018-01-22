import React from 'react';
import { observer } from 'mobx-react';
import HistoryListFilter from './HistoryListFilter';
import HistoryListFilterService from '../../../services/HistoryListFilterService';

const HistoryListFilterContainer = () => (
  <HistoryListFilter
    year={HistoryListFilterService.year}
    onChange={HistoryListFilterService.changeYear}
  />
);

export default observer(HistoryListFilterContainer);
