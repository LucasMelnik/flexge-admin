import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';

const DashboardScene = () => (
  <div>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'CONTENT_ADMIN') && (
      <AdminDashboard />
    )}
    {(localStorage.role === 'TEACHER') && (
      <TeacherDashboard />
    )}
  </div>
);

export default DashboardScene;
