import React from 'react';
import Paper from '../../core/layout/Paper';
import TeacherList from './TeacherList';
import TeacherForm from './TeacherForm';

const TeacherScene = () => (
  <Paper>
    <TeacherForm />
    <TeacherList />
  </Paper>
);

export default TeacherScene;
