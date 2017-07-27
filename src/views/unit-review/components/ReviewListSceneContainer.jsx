import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReviewListScene from './ReviewListScene';
import ReviewListService from '../services/ReviewListService';
import SendUnitToReviewService from '../services/ContentReviewService';

class ReviewListSceneContainer extends Component {

  sendUnitToReviewService = new SendUnitToReviewService();

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
        onSendToReview={this.sendUnitToReviewService.handleSendToReview}
      />
    );
  }
}

export default observer(ReviewListSceneContainer);
