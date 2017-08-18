import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';

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
