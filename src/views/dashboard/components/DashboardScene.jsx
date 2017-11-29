import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import SchoolManagerDashboard from './school-manager/SchoolManagerDashboard';

const DashboardScene = () => (
  <div>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'CONTENT_ADMIN') && (
      <AdminDashboard />
    )}
    {(localStorage.role === 'TEACHER') && (
      <TeacherDashboard />
    )}
    {(localStorage.role === 'SCHOOL_MANAGER') && (
      <SchoolManagerDashboard />
    )}
  </div>
);

export default DashboardScene;
