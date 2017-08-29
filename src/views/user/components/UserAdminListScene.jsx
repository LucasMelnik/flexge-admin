import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import UserAdminListFilterContainer from './UserAdminListFilterContainer';
import UserAdminListContainer from './UserAdminListContainer';

const UserAdminListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Users Admin',
        },
      ]}
    />
    <Card title="Users">
      <UserAdminListFilterContainer />
      <UserAdminListContainer />
    </Card>
  </div>
);

export default UserAdminListScene;
