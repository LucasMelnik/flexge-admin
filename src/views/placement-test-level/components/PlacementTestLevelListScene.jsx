import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import PlacementTestLevelListFilterContainer from './PlacementTestLevelListFilterContainer';
import PlacementTestLevelListContainer from './PlacementTestLevelListContainer';

const PlacementTestLevelListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement test levels',
        },
      ]}
    />
    <Card
      title="Placement test levels"
      actions={
        <Button
          type="primary"
          label="New placement tet level"
          icon="plus"
          onClick={() => browserHistory.push('/placement-test-levels/new')}
        />
      }
    >
      <PlacementTestLevelListFilterContainer />
      <PlacementTestLevelListContainer />
    </Card>
  </div>
);

export default PlacementTestLevelListScene;
