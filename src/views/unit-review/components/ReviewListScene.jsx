import React from 'react';
import PropTypes from 'prop-types';
import MyReviewList from './MyReviewList';
import ToReviewList from './ToReviewList';
import Tabs from '../../../core/layout/Tabs';

const ReviewListScene = props => (
  <Tabs
    tabs={[
      {
        content: (
          <MyReviewList
            unitsAndReviews={props.myUnitsAndReviews}
            fetching={props.fetching}
            onSendToReview={props.onSendToReview}
          />
        ),
        title: 'My units',
      },
      {
        content: (
          <ToReviewList
            unitsAndReviews={props.allUnitsAndReviews}
            fetching={props.fetching}
          />
        ),
        title: 'Units Pending Review',
      },
    ]}
  />
);

ReviewListScene.propTypes = {
  myUnitsAndReviews: PropTypes.array.isRequired,
  allUnitsAndReviews: PropTypes.array.isRequired,
  onSendToReview: PropTypes.func,
  fetching: PropTypes.bool,
};

ReviewListScene.defaultProps = {
  fetching: false,
  onSendToReview: null,
};

export default ReviewListScene;
