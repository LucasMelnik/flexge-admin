import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Async from '../../../core/layout/Async';
import ReviewUnitItemsScene from './ReviewUnitItemScene';
import ReviewFormControlBar from './ReviewFormControlBar';

const ReviewFormScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: `Course - ${props.module.course.name}`,
          link: '/v2/modules',
        },
        {
          text: `Module - ${props.module.name}`,
          link: `/v2/modules/${props.module.id}/details`,
        },
        {
          text: `Unit - ${props.unit.name}`,
          link: `/v2/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'Review Content and Format',
        }
      ]}
    />
    <Card
      title="Unit"
      actions={
        <Button
          icon="fa-arrow-left"
          label="Back to reviews"
          onClick={() => hashHistory.push('/v2/reviews')}
        />
      }
    >
      <Async fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}>
        <UnitFormContainer
          unitId={props.unit.id}
          moduleId={props.module.id}
          reviewId={props.review.id}
          disabled={(props.review.statusFormat === 'PENDING' || props.review.statusFormat === 'PENDING_REVIEW') &&
          (props.review.status === 'PENDING' || (props.review.status === 'REVIEWED' && props.review.createdBy !== localStorage.id))}
        />
      </Async>
    </Card>
    <Separator size="md" />
    <ReviewUnitItemsScene
       unit={props.unit}
       review={props.review}
       fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}
       moduleId={props.module.id}
    />
    <ReviewFormControlBar
      reviewId={props.review.id}
      unitId={props.unit.id}
      fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}
    />
  </div>
);

ReviewFormScene.propTypes = {
  fetching: PropTypes.bool,
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    course: PropTypes.shape({
      name: PropTypes.string,
    })
  }),
  unit: PropTypes.shape({
    id: PropTypes.string,
  }),
  review: PropTypes.shape({
    id: PropTypes.string,
    createdBy: PropTypes.string,
  }),
};

ReviewFormScene.defaultProps = {
  fetching: false,
  module: {},
  unit: {},
  review: {},
};

export default ReviewFormScene;
