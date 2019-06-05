import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import UserListContainer from './UserListContainer';
import CompanyUserListFilterContainer from './CompanyUserListFilterContainer';

const CompanyUserListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Company Users',
        },
      ]}
    />
    <Card>
      <CompanyUserListFilterContainer />
    </Card>
    <Separator />
    <Card
      title="Company Users"
      actions={
        <Button
          type="primary"
          label="Add User"
          icon="plus"
          onClick={() => browserHistory.push('company-users/new')}
        />
      }
    >
      <UserListContainer
        type="COMPANY"
        baseUrl="/company-users"
        baseQuery={{
          role: { $in: (localStorage.role === 'SCHOOL_MANAGER') ? ['TEACHER', 'SCHOOL_MANAGER'] : ['COMPANY_MANAGER', 'TEACHER', 'SCHOOL_MANAGER'] },
        }}
      />
    </Card>
  </div>
);

export default CompanyUserListScene;
