import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import StudentCloseToFinishCourseListContainer from './StudentCloseToFinishCourseListContainer';
import StudentCloseToFinishCourseListFilterContainer from './StudentCloseToFinishCourseListFilterContainer';

const StudentCloseToFinishCourseListScene = () => (
  <div>
    <Card title="Students Close to Finish Course">
      <StudentCloseToFinishCourseListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <StudentCloseToFinishCourseListContainer />
    </Card>
  </div>
);

export default StudentCloseToFinishCourseListScene;
