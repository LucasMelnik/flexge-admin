import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import UserAdminListFilterContainer from './UserAdminListFilterContainer';
import UserAdminListContainer from './UserAdminListContainer';
import Button from '../../../core/form/Button';

const UserAdminListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Users Admin',
        },
      ]}
    />
    <Card
      title="Users"
      actions={
        <Button
          label="New User"
          icon="fa-plus"
          onClick={() => browserHistory.push('/admin-users/new')}
        />
      }
    >
      <UserAdminListFilterContainer />
      <UserAdminListContainer />
    </Card>
  </div>
);

export default UserAdminListScene;
