import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import StudentListFilterContainer from '../../student/components/StudentListFilterContainer';
import StudentListContainer from '../../student/components/StudentListContainer';

const StudentTestListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Student Tests',
        },
      ]}
    />
    <Card
      title="Student Tests"
    >
      <StudentListFilterContainer />
      <StudentListContainer
        onSelect={idStudent => browserHistory.push(`/student-tests/${idStudent}`)}
      />
    </Card>
  </div>
);

export default StudentTestListScene;
