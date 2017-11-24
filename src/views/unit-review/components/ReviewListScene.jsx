import React from 'react';
import PropTypes from 'prop-types';
import MyReviewList from './MyReviewList';
import ToReviewList from './ToReviewList';
import Tabs from '../../../core/layout/Tabs';
import Card from '../../../core/layout/Card';

const ReviewListScene = props => (
  <Tabs
    tabs={[
      {
        content: (
          <Card>
            <MyReviewList
              unitsAndReviews={props.myUnitsAndReviews}
              fetching={props.fetching}
              onSendToReview={props.onSendToReview}
              onFinalReview={props.onFinalReview}
            />
          </Card>
        ),
        title: 'My units',
      },
      {
        content: (
          <Card>
            <ToReviewList
              unitsAndReviews={props.allUnitsAndReviews}
              fetching={props.fetching}
            />
          </Card>
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
  onFinalReview: PropTypes.func,
  fetching: PropTypes.bool,
};

ReviewListScene.defaultProps = {
  fetching: false,
  onSendToReview: null,
};

export default ReviewListScene;
