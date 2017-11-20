import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';

const CompanyListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
        },
      ]}
    />
    <Card
      title="Companies"
      actions={
        <Button
          label="New company"
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push('/companies/new')}
        />
      }
    >
      <CompanyListFilterContainer />
      <CompanyListContainer />
    </Card>
  </div>
);

export default CompanyListScene;
