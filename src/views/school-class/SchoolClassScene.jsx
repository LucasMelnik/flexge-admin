import React from 'react';
import Paper from '../../core/layout/Paper';
import SubTitle from '../../core/content/SubTitle';
import SchoolClassList from './SchoolClassList';
import SchoolClassForm from './SchoolClassForm';

const SchoolClassScene = () => (
  <div>
    <SubTitle>Classes</SubTitle>
    <Paper>
      <SchoolClassForm />
      <SchoolClassList />
    </Paper>
  </div>
);

export default SchoolClassScene;
