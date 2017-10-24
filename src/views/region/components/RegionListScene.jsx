import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import RegionListFilterContainer from './RegionListFilterContainer';
import RegionListContainer from './RegionListContainer';

const RegionListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Regions',
        },
      ]}
    />
    <Card
      title="Regions"
      actions={
        <Button
          label="New region"
          icon="fa-plus"
          onClick={() => browserHistory.push('/regions/new')}
        />
      }
    >
      <RegionListFilterContainer />
      <RegionListContainer />
    </Card>
  </div>
);

export default RegionListScene;
