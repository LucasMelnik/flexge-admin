import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import PlacementTestFormContainer from './PlacementTestFormContainer';
import PlacementTestItems from './PlacementTestItems';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import ReviewFormControlBar from './ReviewFormControlBar';

const PlacementTestFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement Test',
          link: '/placement-test',
        },
        {
          text: props.params.placementTestId ? 'Edit Placement Test Grammar' : 'Create Placement Test Grammar',
        },
      ]}
    />
    <Card
      title={`${props.params.placementTestId ? 'Update' : 'Create'} Placement Test Grammar`}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push('/placement-test')}
          />
        )
      }
    >
      <PlacementTestFormContainer placementTestId={props.params.placementTestId} />
    </Card>
    <Separator size="sm" />
    {props.params.placementTestId && (
      <PlacementTestItems placementTestId={props.params.placementTestId} />
    )}
    {props.params.placementTestId && (
      <ReviewFormControlBar placementTestId={props.params.placementTestId} />
    )}
  </div>
);

PlacementTestFormScene.propTypes = {
  params: PropTypes.shape({
    placementTestId: PropTypes.string,
  }).isRequired,
};

export default PlacementTestFormScene;
