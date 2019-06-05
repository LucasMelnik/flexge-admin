import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import UserListContainer from './UserListContainer';
import DistributorUserListFilterContainer from './DistributorUserListFilterContainer';

const DistributorUserListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributor Users',
        },
      ]}
    />
    <Card>
      <DistributorUserListFilterContainer />
    </Card>
    <Separator />
    <Card
      title="Distributor Users"
      actions={
        <Button
          type="primary"
          label="Add User"
          icon="plus"
          onClick={() => browserHistory.push(`/distributors-users/new`)}
        />
      }
    >
      <UserListContainer
        type="DISTRIBUTOR"
        baseUrl="/distributors-users"
        baseQuery={{
          role: { $in: ['DISTRIBUTOR_MANAGER'] },
        }}
      />
    </Card>
  </div>
);

export default DistributorUserListScene;
