import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import DistributorListFilterContainer from './DistributorListFilterContainer';
import DistributorListContainer from './DistributorListContainer';

const DistributorListScene = () => (
  <div>
    {/*<Breadcrumb*/}
      {/*crumbs={[*/}
        {/*{*/}
          {/*text: 'Distributors',*/}
        {/*},*/}
      {/*]}*/}
    {/*/>*/}
    <Card
      title="Distributors"
      actions={
        <Button
          type="primary"
          label="New distributor"
          icon="plus"
          onClick={() => browserHistory.push('/distributors/new')}
        />
      }
    >
      <DistributorListFilterContainer />
      <DistributorListContainer />
    </Card>
  </div>
);

export default DistributorListScene;
