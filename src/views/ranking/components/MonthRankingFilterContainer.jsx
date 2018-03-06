import React from 'react';
import { observer } from 'mobx-react';
import MonthRankingFilter from './MonthRankingFilter';
import RankingListFilterService from '../services/RankingListFilterService';

const MonthRankingFilterContainer = () => (
  <MonthRankingFilter
    values={RankingListFilterService.form.getValues()}
    onChange={RankingListFilterService.form.setValue}
    onSearch={RankingListFilterService.handleSearchMonthlyRanking}
  />
);

export default observer(MonthRankingFilterContainer);
