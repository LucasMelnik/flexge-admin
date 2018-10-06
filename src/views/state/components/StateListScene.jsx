import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import StateListFilterContainer from './StateListFilterContainer';
import StateListContainer from './StateListContainer';

const StateListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'States',
        },
      ]}
    />
    <Card
      title="States"
      actions={
        <Button
          type="primary"
          label="New state"
          icon="plus"
          onClick={() => browserHistory.push('/states/new')}
        />
      }
    >
      <StateListFilterContainer />
      <StateListContainer />
    </Card>
  </div>
);

export default StateListScene;
