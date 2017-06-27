import React from 'react';
import { observer } from 'mobx-react';
import ReviewListService from '../services/ReviewListService';
import ReviewListFilter from './ReviewListFilter';

const ToReviewListFilterContainer = () => (
  <ReviewListFilter
    values={ReviewListService.formAllReviews.getValues()}
    onChange={ReviewListService.formAllReviews.setValue}
    onSearch={ReviewListService.handleAllUnits}
    fetching={ReviewListService.fetch.fetching}
  />
);

export default observer(ToReviewListFilterContainer);
