import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const StudentAchievementsScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Achievements',
        },
      ]}
    />
    <Card title="Students Achievements">
      No achievements found for your students.
    </Card>
  </div>
);

export default StudentAchievementsScene;
