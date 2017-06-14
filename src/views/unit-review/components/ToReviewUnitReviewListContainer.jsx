import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitReviewList from './UnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

const ToReviewUnitReviewListContainer = () => (
  <UnitReviewList
    units={toJS(UnitReviewListService.unitsToReview)}
    fetching={UnitReviewListService.fetch.fetching}
  />
);

export default observer(ToReviewUnitReviewListContainer);
