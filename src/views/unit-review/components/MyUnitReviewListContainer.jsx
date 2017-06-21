import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MyUnitReviewList from './MyUnitReviewList';
import UnitReviewListService from '../services/UnitReviewListService';

const MyUnitReviewListContainer = () => (
  <MyUnitReviewList
    units={toJS(UnitReviewListService.unitsAndReviews)}
    fetching={UnitReviewListService.fetch.fetching}
    onSendReview={UnitReviewListService.onSendReview}
  />
);

export default observer(MyUnitReviewListContainer);
