import React from 'react';
import { browserHistory } from 'react-router';
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
          onClick={() => browserHistory.push('/v2/teachers/new')}
        />,
      ]}
    >
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
          <TeacherListFilterContainer />
        </div>
      </div>
      <TeacherListContainer />
    </Card>
  </div>
);

export default TeacherListScene;
