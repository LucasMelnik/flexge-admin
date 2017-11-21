import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CourseListFilterContainer from './CourseListFilterContainer';
import CourseListContainer from './CourseListContainer';

const CourseListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Courses',
        },
      ]}
    />
    <Card
      title="Courses"
      actions={
        <Button
          label="New course"
          icon="plus"
          onClick={() => browserHistory.push('/courses/new')}
        />
      }
    >
      <CourseListFilterContainer />
      <CourseListContainer />
    </Card>
  </div>
);

export default CourseListScene;
