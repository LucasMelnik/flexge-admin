import React from 'react';
import { hashHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import TeacherListFilterContainer from './TeacherListFilterContainer';
import TeacherListContainer from './TeacherListContainer';

const TeacherListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Teachers',
        },
      ]}
    />
    <Card
      title="Teachers"
      actions={[
        <Button
          label="New teacher"
          icon="fa-plus"
          onClick={() => hashHistory.push('/v2/teachers/new')}
        />,
      ]}
    >
      <TeacherListFilterContainer />
      <TeacherListContainer />
    </Card>
  </div>
);

export default TeacherListScene;
