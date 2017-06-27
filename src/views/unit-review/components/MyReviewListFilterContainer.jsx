import React from 'react';
import { observer } from 'mobx-react';
import ReviewListService from '../services/ReviewListService';
import ReviewListFilter from './ReviewListFilter';

const MyReviewListFilterContainer = () => (
  <ReviewListFilter
    values={ReviewListService.formMyReviews.getValues()}
    onChange={ReviewListService.formMyReviews.setValue}
    onSearch={ReviewListService.handleMyUnits}
    fetching={ReviewListService.fetch.fetching}
  />
);

export default observer(MyReviewListFilterContainer);
