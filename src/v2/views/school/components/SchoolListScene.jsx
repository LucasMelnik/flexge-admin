import React from 'react';
import { hashHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const SchoolListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
          link: ' ',
        },
      ]}
    />
    <Card
      title="Schools"
      actions={[
        <Button
          label="New school"
          icon="fa-plus"
          onClick={() => hashHistory.push('/v2/schools/new')}
        />,
      ]}
    >
      <SchoolListFilterContainer />
      <SchoolListContainer />
    </Card>
  </div>
);

export default SchoolListScene;
