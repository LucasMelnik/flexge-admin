import React from 'react';
import Paper from '../../core/layout/Paper';
import SchoolClassList from './SchoolClassList';
import SchoolClassForm from './SchoolClassForm';

const SchoolClassScene = () => (
  <Paper>
    <SchoolClassForm />
    <SchoolClassList />
  </Paper>
);

export default SchoolClassScene;
