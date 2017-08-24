import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import UserFormContainer from './UserFormContainer';

const UserAdminFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Users',
          link: '/v2/users',
        },
        {
          text: props.params.userId ? 'Edit User' : 'Create User',
        },
      ]}
    />
    <UserFormContainer
      roleUser="ADMIN"
      userId={props.params.userId}
      companyId={props.params.companyId}
    />
  </div>
);

UserAdminFormScene.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
    companyId: PropTypes.string,
  }),
};

UserAdminFormScene.defaultProps = {
  params: null,
};

export default UserAdminFormScene;
