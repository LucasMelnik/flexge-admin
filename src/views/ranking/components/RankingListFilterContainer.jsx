import React from 'react';
import { observer } from 'mobx-react';
import RankingListFilter from './RankingListFilter';
import RankingListService from '../services/RankingListService';

const RankingListFilterContainer = () => (
  <RankingListFilter
    value={RankingListService.schoolId || ''}
    onChange={RankingListService.handleFilterChange}
    disabled={
      RankingListService.fetchRegional.fetching ||
      RankingListService.fetchNational.fetching
    }
  />
);

export default observer(RankingListFilterContainer);
