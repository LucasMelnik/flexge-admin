import React from 'react';
import { observer } from 'mobx-react';
import RankingListFilter from './RankingListFilter';
import RankingListFilterService from '../services/RankingListFilterService';

const RankingListFilterContainer = () => (
  <RankingListFilter
    value={RankingListFilterService.schoolId || ''}
    onChange={RankingListFilterService.handleFilterChange}
  />
);

export default observer(RankingListFilterContainer);
