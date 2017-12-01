import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import UserListContainer from './UserListContainer';
import Separator from '../../../core/layout/Separator';
import CompanyUserListSceneFilterContainer from './CompanyUserListSceneFilterContainer';

const CompanyUserListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Company Users',
        },
      ]}
    />
    <Card>
      <CompanyUserListSceneFilterContainer />
    </Card>
    <Separator />
    {props.companies.map(company => (
      <div key={company.id}>
        <Card
          title={company.name}
          actions={
            <Button
              type="primary"
              label="Add User"
              icon="plus"
              onClick={() => browserHistory.push(`/companies/${company.id}/users/new`)}
            />
          }
        >
          <UserListContainer
            baseUrl={`/companies/${company.id}/users`}
            baseQuery={{
              company: company.id,
              role: { $in: ['COMPANY_MANAGER', 'TEACHER', 'SCHOOL_MANAGER'] },
            }}
          />
        </Card>
        <Separator />
      </div>
    ))}
  </div>
);

CompanyUserListScene.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default CompanyUserListScene;
