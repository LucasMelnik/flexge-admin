import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import SchoolManagerDashboard from './school-manager/SchoolManagerDashboard';
import CompanyManagerDashboard from './company-manager/CompanyManagerDashboard';

const DashboardScene = () => (
  <div style={{ padding: 20, paddingTop: 0 }}>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'CONTENT_ADMIN') && (
      <AdminDashboard />
    )}
    {(localStorage.role === 'TEACHER') && (
      <TeacherDashboard />
    )}
    {(localStorage.role === 'SCHOOL_MANAGER') && (
      <SchoolManagerDashboard />
    )}
    {(localStorage.role === 'COMPANY_MANAGER') && (
      <CompanyManagerDashboard />
    )}
  </div>
);

export default DashboardScene;
