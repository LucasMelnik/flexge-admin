import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserFormContainer from './UserFormContainer';

const AdminUserFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Admin Users',
          link: 'admin-users',
        },
        {
          text: props.params.userId ? 'Update User' : 'New User',
        },
      ]}
    />
    <Card
      title={props.params.userId ? 'Update User' : 'New User'}
      actions={
        <Button
          label="Back"
          icon="arrow-left"
          onClick={() => browserHistory.push('/admin-users')}
        />
      }
    >
      <UserFormContainer
        type="ADMIN"
        userId={props.params.userId}
      />
    </Card>
  </div>
);

AdminUserFormScene.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

export default AdminUserFormScene;
