import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import StudentAchievementsListContainer from './StudentAchievementsListContainer';
import StudentAchievementsListFilterContainer from './StudentAchievementsListFilterContainer';
import Separator from '../../../core/layout/Separator';

const StudentAchievementsListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Achievements',
        },
      ]}
    />
    <Card title="Students Achievements">
      <StudentAchievementsListFilterContainer />
      <Separator />
      <StudentAchievementsListContainer />
    </Card>
  </div>
);

export default StudentAchievementsListScene;
