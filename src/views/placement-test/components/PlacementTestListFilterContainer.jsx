import React from 'react';
import { observer } from 'mobx-react';
import PlacementTestListService from '../services/PlacementTestListService';
import PlacementTestListFilter from './PlacementTestListFilter';

const PlacementTestListFilterContainer = () => (
  <PlacementTestListFilter
    values={PlacementTestListService.form.getValues()}
    onChange={PlacementTestListService.form.setValue}
    fetching={PlacementTestListService.fetch.fetching}
    onSearch={PlacementTestListService.load}
  />
);

export default observer(PlacementTestListFilterContainer);
