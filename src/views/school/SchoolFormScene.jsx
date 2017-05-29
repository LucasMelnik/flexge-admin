import React from 'react';
import Title from '../../core/content/Title';
import SchoolForm from './SchoolForm';
import SchoolClassScene from '../school-class/SchoolClassScene';
import Tabs from '../../core/navigation/Tabs';

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
          content: <div>Teachers</div>,
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
