import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
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
      actions={
        <Button
          type="primary"
          label="New school"
          icon="plus"
          onClick={() => browserHistory.push('/schools/new')}
        />
      }
    >
      <SchoolListFilterContainer />
      <SchoolListContainer />
    </Card>
  </div>
);

export default SchoolListScene;
