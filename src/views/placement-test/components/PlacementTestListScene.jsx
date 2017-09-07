import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
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
          label="New Grammar"
          icon="fa-plus"
          onClick={() => browserHistory.push('/placement-test/new')}
        />
      }
    >
      <PlacementTestListFilterContainer />
      <Separator />
      <PlacementTestListContainer />
    </Card>
  </div>
);

export default PlacementTestListScene;