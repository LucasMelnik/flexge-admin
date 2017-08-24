import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import UserFormContainer from './UserFormContainer';

const UserFormScene = props => (
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
      roleUser="DISTRIBUTOR_MANAGER"
      userId={props.params.userId}
      companyId={props.params.companyId}
    />
  </div>
);

UserFormScene.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
    companyId: PropTypes.string,
  }),
};

UserFormScene.defaultProps = {
  params: null,
};

export default UserFormScene;
