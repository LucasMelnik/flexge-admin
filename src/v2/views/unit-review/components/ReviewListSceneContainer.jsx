import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReviewListScene from './ReviewListScene';
import ReviewListService from '../services/ReviewListService';
import ContentReviewService from '../services/ContentReviewService';

class ReviewListSceneContainer extends Component {

  contentReviewService = new ContentReviewService();

  componentDidMount() {
    ReviewListService.handleMyUnits();
    ReviewListService.handleAllUnits();
  }

  render() {
    return (
      <ReviewListScene
        myUnitsAndReviews={toJS(ReviewListService.myUnitsAndReviews)}
        allUnitsAndReviews={toJS(ReviewListService.allUnitsAndReviews)}
        fetching={ReviewListService.fetch.fetching}
        onSendToReview={this.contentReviewService.handleSendToReview}
      />
    );
  }
}

export default observer(ReviewListSceneContainer);
