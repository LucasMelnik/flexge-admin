import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const CompanyListSceneV2 = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/companies',
        }
      ]}
    />
    <Card
      title="Companies"
      actions={[
        <Button
          label="New company"
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/companies/new')}
        />
      ]}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '40%',
          }}
        >
          <CompanyListFilterContainer />
        </div>
      </div>
      <CompanyListContainer />
    </Card>
  </div>
);

export default CompanyListSceneV2;
