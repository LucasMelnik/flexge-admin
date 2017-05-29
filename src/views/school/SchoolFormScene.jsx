import React from 'react';
import Title from '../../core/content/Title';
import Tabs from '../../core/navigation/Tabs';
import SchoolForm from './SchoolForm';
import SchoolClassScene from '../school-class/SchoolClassScene';
import TeacherScene from '../teacher/TeacherScene';

const SchoolFormScene = () => (
  <div>
    <Title>
      School
    </Title>
    <Tabs
      tabs={[
        {
          label: 'School information',
          content: <SchoolForm />,
        },
        {
          label: 'Teachers',
          content: <TeacherScene />,
        },
        {
          label: 'Classes',
          content: <SchoolClassScene />,
        },
      ]}
    />
  </div>
);

export default SchoolFormScene;
