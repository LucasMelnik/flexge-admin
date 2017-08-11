import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import StudentListFilterContainer from './StudentListFilterContainer';
import StudentListContainer from './StudentListContainer';

const StudentListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Students',
        },
      ]}
    />
    <Card
      title="Students"
      actions={[
        <Button
          label="New student"
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/students/new')}
        />,
      ]}
    >
      <StudentListFilterContainer />
      <StudentListContainer />
    </Card>
  </div>
);

export default StudentListScene;
