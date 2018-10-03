import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CountryListFilterContainer from './CountryListFilterContainer';
import CountryListContainer from './CountryListContainer';

const CountryListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Countries',
        },
      ]}
    />
    <Card
      title="Countries"
      actions={
        <Button
          type="primary"
          label="New country"
          icon="plus"
          onClick={() => browserHistory.push('/countries/new')}
        />
      }
    >
      <CountryListFilterContainer />
      <CountryListContainer />
    </Card>
  </div>
);

export default CountryListScene;
