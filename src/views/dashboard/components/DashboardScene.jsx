import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboardContainer from './teacher/TeacherDashboardContainer';
import SchoolManagerDashboardContainer from './school-manager/SchoolManagerDashboardContainer';
import CompanyManagerDashboardContainer from './company-manager/CompanyManagerDashboardContainer';

const DashboardScene = () => (
  <div style={{ padding: 20, paddingTop: 0 }}>
    {(localStorage.role === 'ADMIN' || localStorage.role === 'CONTENT_ADMIN') && (
      <AdminDashboard />
    )}
    {(localStorage.role === 'TEACHER') && (
      <TeacherDashboardContainer />
    )}
    {(localStorage.role === 'SCHOOL_MANAGER') && (
      <SchoolManagerDashboardContainer />
    )}
    {(localStorage.role === 'COMPANY_MANAGER') && (
      <CompanyManagerDashboardContainer />
    )}
  </div>
);

export default DashboardScene;
