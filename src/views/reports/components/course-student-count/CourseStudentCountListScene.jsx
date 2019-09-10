import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import FinishedStudentCourseListContainer from './CourseStudentCountListContainer';
import FinishedStudentCourseListFilterContainer from './CourseStudentCountListFilterContainer';

const CourseStudentCountListScene = () => (
  <div>
    <Card title="Active students by course">
      <FinishedStudentCourseListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <FinishedStudentCourseListContainer />
    </Card>
  </div>
);

export default CourseStudentCountListScene;
