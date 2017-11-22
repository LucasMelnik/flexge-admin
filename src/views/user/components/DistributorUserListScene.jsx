import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserListContainer from './UserListContainer';
import Separator from '../../../core/layout/Separator';
import DistributorUserListSceneFilterContainer from './DistributorUserListSceneFilterContainer';

const DistributorUserListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributor Users',
        },
      ]}
    />
    <Card>
      <DistributorUserListSceneFilterContainer />
    </Card>
    <Separator />
    {props.distributors.map(distributor => (
      <div key={distributor.id}>
        <Card
          title={distributor.name}
          actions={
            <Button
              type="primary"
              label="Add User"
              icon="plus"
              onClick={() => browserHistory.push(`/distributors/${distributor.id}/users/new`)}
            />
          }
        >
          <UserListContainer
            baseUrl={`/distributors/${distributor.id}/users`}
            baseQuery={{
              distributor: distributor.id,
              role: { $in: ['DISTRIBUTOR_MANAGER'] },
            }}
          />
        </Card>
        <Separator />
      </div>
    ))}
  </div>
);

DistributorUserListScene.propTypes = {
  distributors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default DistributorUserListScene;
