import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UnitTypeListContainer from './UnitTypeListContainer';

const UnitTypeListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Unit Types',
        },
      ]}
    />
    <Card
      title="Unit Types"
      actions={
        <Button
          type="primary"
          label="New unit type"
          icon="plus"
          onClick={() => browserHistory.push('/unit-types/new')}
        />
      }
    >
      <UnitTypeListContainer />
    </Card>
  </div>
);

export default UnitTypeListScene;
