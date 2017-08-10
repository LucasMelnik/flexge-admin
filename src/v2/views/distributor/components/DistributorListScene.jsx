import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import DistributorListFilterContainer from './DistributorListFilterContainer';
import DistributorListContainer from './DistributorListContainer';

const DistributorListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributors',
        },
      ]}
    />
    <Card
      title="Distributors"
      actions={[
        <Button
          label="New distributor"
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/distributors/new')}
        />,
      ]}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '40%',
          }}
        >
          <DistributorListFilterContainer />
        </div>
      </div>
      <DistributorListContainer />
    </Card>
  </div>
);

export default DistributorListScene;
