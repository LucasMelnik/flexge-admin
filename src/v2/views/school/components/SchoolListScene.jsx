import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';

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
      actions={[
        <Button
          label="New school"
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/schools/new')}
        />,
      ]}
    >
      <SchoolListFilterContainer />
      <SchoolListContainer />
    </Card>
  </div>
);

export default SchoolListScene;
