import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Async from '../../../core/layout/Async';
import ReviewUnitItemsScene from './ReviewUnitItemScene';
import ReviewFormControlBar from './ReviewFormControlBar';
import ReviewUnitItemImageScene from './ReviewUnitItemImageScene';
import { Roles } from '../../../core/util';

const ReviewFormScene = props => {
  const isUnitWithImage = props.unit &&
    props.unit.type &&
    props.unit.type.itemsType.find(itemType => [
      'PRESENTATION',
      'SINGLE_CHOICE_IMAGE',
      'SINGLE_CHOICE_KIDS',
      'GAP_FILL_IMAGE',
      'GAP_FILL_LETTER',
      'VOCABULARY',
      'PHONEME',
      'TRUE_FALSE_KIDS',
      'VOCABULARY_GAME',
      'MEMORY_GAME',
      'CONNECTING_DOTS',
      'SINGLE_CHOICE_GAME',
    ].find(type => type === itemType.key));

  return (
    <div>
      <Breadcrumb
        fetching={props.fetching}
        crumbs={[
          {
            text: `Course - ${props.module.course.name}`,
            link: '/modules',
          },
          {
            text: `Module - ${props.module.name}`,
            link: `/modules/${props.module.id}/details`,
          },
          {
            text: `Unit - ${props.unit.name}`,
            link: `/modules/${props.module.id}/units/${props.unit.id}`,
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
            icon="arrow-left"
            label="Back to reviews"
            onClick={() => browserHistory.push('/reviews')}
          />
        }
      >
        <Async fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}>
          <UnitFormContainer
            unitId={props.unit.id}
            moduleId={props.module.id}
            reviewId={props.review.id}
            disabled={(props.review.statusFormat === 'PENDING' || props.review.statusFormat === 'PENDING_REVIEW') ||
            (![Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && props.unit.createdBy !== localStorage.id)}
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
      {([Roles.ADMIN, Roles.SUPPORT, Roles.IMAGE_ADMIN].some(r => r === localStorage.role) && isUnitWithImage) && (
        <div>
          <Separator size="md" />
          <ReviewUnitItemImageScene
            unit={props.unit}
            review={props.review}
            fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}
          />
        </div>
      )}
      {
        ([Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN].some(r => r === localStorage.role) ||
        (localStorage.role === 'IMAGE_ADMIN' && isUnitWithImage)) && (
          <ReviewFormControlBar
            reviewId={props.review.id}
            unitId={props.unit.id}
            fetching={props.fetching || !props.unit.id || !props.review.id || !props.module.id}
            imageReview={[Roles.ADMIN, Roles.SUPPORT, Roles.IMAGE_ADMIN].some(r => r === localStorage.role) && isUnitWithImage}
          />
        )}
    </div>
  );
};

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
