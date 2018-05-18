import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import FinishedStudentCourseListContainer from './FinishedStudentCourseListContainer';
import FinishedStudentCourseListFilterContainer from './FinishedStudentCourseListFilterContainer';

const FinishedStudentCourseListScene = () => (
  <div>
    <Card title="Finished Courses">
      <FinishedStudentCourseListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <FinishedStudentCourseListContainer />
    </Card>
  </div>
);

export default FinishedStudentCourseListScene;
