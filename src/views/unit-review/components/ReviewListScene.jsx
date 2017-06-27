import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../core/navigation/Tabs';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import MyReviewListFilterContainer from './MyReviewListFilterContainer';
import MyReviewList from './MyReviewList';
import ToReviewList from './ToReviewList';

const ReviewListScene = props => (
  <div>
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
          label: 'My units',
        },
        {
          content: (
            <ToReviewList
              unitsAndReviews={props.allUnitsAndReviews}
              fetching={props.fetching}
            />
          ),
          label: 'Units Pending Review',
        },
      ]}
    />
  </div>
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
