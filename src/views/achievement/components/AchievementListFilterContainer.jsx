import React from 'react';
import { observer } from 'mobx-react';
import AchievementListService from '../services/AchievementListService';
import AchievementListFilter from './AchievementListFilter';

const AchievementListFilterContainer = () => (
  <AchievementListFilter
    value={AchievementListService.filter}
    onChange={AchievementListService.handleFilterChange}
  />
);

export default observer(AchievementListFilterContainer);
