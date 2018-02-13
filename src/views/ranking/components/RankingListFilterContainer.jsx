import React from 'react';
import { observer } from 'mobx-react';
import RankingListFilter from './RankingListFilter';
import RankingListService from '../services/RankingListService';

const RankingListFilterContainer = () => (
  <RankingListFilter
    values={RankingListService.form.getValues()}
    errors={RankingListService.form.errors}
    onChange={RankingListService.form.setValue}
    onSearch={RankingListService.handleSearch}
  />
);

export default observer(RankingListFilterContainer);
