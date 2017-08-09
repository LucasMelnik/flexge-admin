import React from 'react';
import { browserHistory } from 'react-router';
import Title from '../../../core/layout/Title';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';

const CompanyListSceneV2 = () => (
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
);

export default CompanyListSceneV2;
