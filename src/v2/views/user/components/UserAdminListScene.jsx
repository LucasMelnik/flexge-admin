import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import UserListContainer from './UserListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Async from '../../../core/layout/Async';
import Separator from '../../../core/layout/Separator';
import AdminCompanyListFilterContainer from './AdminCompanyListFilterContainer';

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
      <AdminCompanyListFilterContainer />
    </Card>
    <Async fetching={props.fetching}>
      {props.companies.map(company => (
        <div key={`id-${company.id}`}>
          <Separator size="md" />
          <Card
            title={company.name}
            actions={
              <Button
                label="New User"
                icon="fa-plus"
                onClick={() => browserHistory.push(`/v2/companies/${company.id}/admin-users/new`)}
              />
            }
          >
            <UserListContainer
              roleUser="ADMIN"
              company={company}
            />
          </Card>
        </div>
      ))}
    </Async>
  </div>
);

UserAdminListScene.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UserAdminListScene;
