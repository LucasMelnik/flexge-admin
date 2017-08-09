import React from 'react';
import { browserHistory } from 'react-router';
import Title from '../../../core/layout/Title';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';

const CompanyListSceneV2 = () => (
  <div
    style={{
      marginRight: 15,
    }}
  >
    <Title>
      Companies
    </Title>
    <Separator size="sm" />
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

      <Button
        label="New company"
        onClick={() => browserHistory.push('/v2/companies/new')}
      />
    </div>
    <CompanyListContainer />
    <Separator size="sm" />
  </div>
);

export default CompanyListSceneV2;
