import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const SchoolListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
        },
      ]}
    />
    <Card
      title="Schools"
      actions={(
        <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
          <Button
            type="primary"
            label="New school"
            icon="plus"
            onClick={() => browserHistory.push('/schools/new')}
          />
        </PermissionValidator>
      )}
    >
      <SchoolListFilterContainer />
      <SchoolListContainer />
    </Card>
  </div>
);

export default SchoolListScene;
