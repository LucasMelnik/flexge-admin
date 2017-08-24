import React from 'react';
import { hashHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolClassListFilterContainer from './SchoolClassListFilterContainer';
import SchoolClassListContainer from './SchoolClassListContainer';

const SchoolListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Classes',
        },
      ]}
    />
    <Card
      title="Classes"
      actions={[
        <Button
          label="New class"
          icon="fa-plus"
          onClick={() => hashHistory.push('/v2/classes/new')}
        />,
      ]}
    >
      <SchoolClassListFilterContainer />
      <SchoolClassListContainer />
    </Card>
  </div>
);

export default SchoolListScene;
