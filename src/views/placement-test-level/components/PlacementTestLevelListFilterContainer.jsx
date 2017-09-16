import React from 'react';
import { observer } from 'mobx-react';
import PlacementTestLevelListService from '../services/PlacementTestLevelListService';
import PlacementTestLevelListFilter from './PlacementTestLevelListFilter';

const PlacementTestLevelListFilterContainer = () => (
  <PlacementTestLevelListFilter
    course={PlacementTestLevelListService.course}
    onChange={PlacementTestLevelListService.handleFilterChange}
  />
);

export default observer(PlacementTestLevelListFilterContainer);
