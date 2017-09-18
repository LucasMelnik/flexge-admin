import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import PlacementTestLevelFormContainer from './PlacementTestLevelFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const PlacementTestLevelFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.placementTestLevelId ? 'Edit Placement Test Level' : 'Create Placement Test Level'}`,
        },
      ]}
    />
    <Card
      title={props.placementTestLevelId ? 'Edit Placement Test Level' : 'Create Placement Test Level'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <PlacementTestLevelFormContainer placementTestLevelId={props.placementTestLevelId} />
    </Card>
  </div>
);

PlacementTestLevelFormScene.propTypes = {
  placementTestLevelId: PropTypes.string,
};

PlacementTestLevelFormScene.defaultProps = {
  placementTestLevelId: null,
};

export default PlacementTestLevelFormScene;
