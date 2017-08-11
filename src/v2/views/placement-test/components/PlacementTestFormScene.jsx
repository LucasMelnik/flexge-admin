import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../core/layout/Separator';
import PlacementTestFormContainer from './PlacementTestFormContainer';
import PlacementTestItems from './PlacementTestItems';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const PlacementTestFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement Test',
          link: '/v2/placement-test',
        },
        {
          text: props.placementTestId ? 'Edit Placement Test Grammar' : 'Create Placement Test Grammar',
        },
      ]}
    />
    <Card title={`${props.placementTestId ? 'Update' : 'Create'} Placement Test Grammar`}>
      <PlacementTestFormContainer />
    </Card>
    <Separator size="sm" />
    {/* {props.placementTestId && (
      <PlacementTestItems placementTestId={props.placementTestId} />
    )} */}
  </div>
);

PlacementTestFormScene.propTypes = {
  placementTestId: PropTypes.string,
};
PlacementTestFormScene.defaultProps = {
  placementTestId: null,
};

export default PlacementTestFormScene;
