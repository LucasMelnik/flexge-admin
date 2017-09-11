import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import ReviewUnitItemImageListContainer from './ReviewUnitItemImageListContainer';
import Async from '../../../core/layout/Async';
import ImageReviewFormContainer from './ImageReviewFormContainer';
import Separator from '../../../core/layout/Separator';

const ReviewUnitItemImageScene = props => (
  <Card
    title="Review Item Images"
  >
    <Async fetching={props.fetching}>
      <ReviewUnitItemImageListContainer
        unit={props.unit.id}
      />
      <Separator />
      <ImageReviewFormContainer
        unitId={props.unit.id}
        reviewId={props.review.id}
      />
    </Async>
  </Card>
);

ReviewUnitItemImageScene.propTypes = {
  fetching: PropTypes.bool,
  unit: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  review: PropTypes.shape({
    id: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

export default ReviewUnitItemImageScene;
