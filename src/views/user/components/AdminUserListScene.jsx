import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserListContainer from './UserListContainer';

const AdminUserListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Admin Users',
        },
      ]}
    />
    <Card
      title="Users"
      actions={
        <Button
          type="primary"
          label="Add User"
          icon="plus"
          onClick={() => browserHistory.push('/admin-users/new')}
        />
      }
    >
      <UserListContainer
        baseUrl="/admin-users"
        baseQuery={{
          role: { $in: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'] },
        }}
      />
    </Card>
  </div>
);

export default AdminUserListScene;
