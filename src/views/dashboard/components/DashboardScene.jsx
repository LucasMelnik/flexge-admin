import React from 'react';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboardContainer from './teacher/TeacherDashboardContainer';
import SchoolManagerDashboardContainer from './school-manager/SchoolManagerDashboardContainer';
import CompanyManagerDashboardContainer from './company-manager/CompanyManagerDashboardContainer';
import DistributorManagerDashboard from './distributor-manager/DistributorManagerDashboard';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const DashboardScene = () => (
  <div style={{ padding: 20, paddingTop: 0 }}>
    <PermissionValidator allowedFor={[Roles.CONTENT_ADMIN]}>
      <AdminDashboard />
    </PermissionValidator>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER]}>
      <DistributorManagerDashboard />
    </PermissionValidator>
    <PermissionValidator allowedFor={[Roles.TEACHER]}>
      <TeacherDashboardContainer />
    </PermissionValidator>
    <PermissionValidator allowedFor={[Roles.SCHOOL_MANAGER]}>
      <SchoolManagerDashboardContainer />
    </PermissionValidator>
    <PermissionValidator allowedFor={[Roles.COMPANY_MANAGER]}>
      <CompanyManagerDashboardContainer />
    </PermissionValidator>
  </div>
);

export default DashboardScene;
