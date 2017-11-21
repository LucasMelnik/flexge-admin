import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import PlacementTestListContainer from './PlacementTestListContainer';
import PlacementTestListFilterContainer from './PlacementTestListFilterContainer';

const PlacementTestListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement Test',
        },
      ]}
    />
    <Card
      title="Placement Test"
      actions={
        <Button
          type="primary"
          label="New Grammar"
          icon="plus"
          onClick={() => browserHistory.push('/placement-test/new')}
        />
      }
    >
      <PlacementTestListFilterContainer />
      <PlacementTestListContainer />
    </Card>
  </div>
);

export default PlacementTestListScene;
