import React from 'react';
import Card from '../../../core/layout/Card';
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
    >
      <StudentListFilterContainer hasSchoolClass={false} />
      <StudentListContainer />
    </Card>
  </div>
);

export default StudentListScene;
