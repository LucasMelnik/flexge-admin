import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import PlacementTestItemsListContainer from './PlacementTestItemsListContainer';

const PlacementTestItemsListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement Test Items History',
        },
      ]}
    />
    <Card
      title="Placement Test Items History"
    >
      <PlacementTestItemsListContainer />
    </Card>
  </div>
);

export default PlacementTestItemsListScene;
