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
    </Card>
    <Separator />
    <Card title="School">
      <StudentAchievementsListContainer type="school" />
    </Card>
    <Separator />
    <Card title="Regional">
      <StudentAchievementsListContainer type="regional" />
    </Card>
    <Separator />
    <Card title="National">
      <StudentAchievementsListContainer type="national" />
    </Card>
  </div>
);

export default StudentAchievementsListScene;
