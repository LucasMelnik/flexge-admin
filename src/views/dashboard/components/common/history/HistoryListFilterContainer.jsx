import React from 'react';
import { observer } from 'mobx-react';
import HistoryListFilter from './HistoryListFilter';

const HistoryListFilterContainer = () => (
  <HistoryListFilter
    onChange={value => console.log(value)}
  />
);

export default observer(HistoryListFilterContainer);
