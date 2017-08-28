import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import UserAdminListFilterContainer from './UserAdminListFilterContainer';
import UserAdminListContainer from './UserAdminListContainer';

const UserAdminListScene = props => (
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
