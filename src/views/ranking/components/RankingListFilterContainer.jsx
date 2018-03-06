import React from 'react';
import { observer } from 'mobx-react';
import RankingListFilter from './RankingListFilter';
import RankingListFilterService from '../services/RankingListFilterService';

const RankingListFilterContainer = () => (
  <RankingListFilter
    values={RankingListFilterService.form.getValues()}
    errors={RankingListFilterService.form.errors}
    onChange={RankingListFilterService.form.setValue}
    onSearch={RankingListFilterService.handleSearch}
  />
);

export default observer(RankingListFilterContainer);
