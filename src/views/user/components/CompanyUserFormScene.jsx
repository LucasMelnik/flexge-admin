import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserFormContainer from './UserFormContainer';

const CompanyUserFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Company Users',
          link: 'company-users',
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
          onClick={() => browserHistory.push('/company-users')}
        />
      }
    >
      <UserFormContainer
        type="COMPANY"
        companyId={props.params.companyId}
        userId={props.params.userId}
      />
    </Card>
  </div>
);

CompanyUserFormScene.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
    companyId: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyUserFormScene;
