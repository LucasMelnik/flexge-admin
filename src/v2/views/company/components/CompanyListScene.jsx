import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
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
      actions={[
        <Button
          label="New company"
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/companies/new')}
        />,
      ]}
    >
      <CompanyListFilterContainer />
      <CompanyListContainer />
    </Card>
  </div>
);

export default CompanyListScene;
