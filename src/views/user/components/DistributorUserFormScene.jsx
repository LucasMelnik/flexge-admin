import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserFormContainer from './UserFormContainer';

const DistributorUserFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Distributor Users',
          link: 'distributor-users',
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
          onClick={() => browserHistory.push('/distributor-users')}
        />
      }
    >
      <UserFormContainer
        type="DISTRIBUTOR"
        distributorId={props.params.distributorId}
        userId={props.params.userId}
      />
    </Card>
  </div>
);

DistributorUserFormScene.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
    distributorId: PropTypes.string.isRequired,
  }).isRequired,
};

export default DistributorUserFormScene;
