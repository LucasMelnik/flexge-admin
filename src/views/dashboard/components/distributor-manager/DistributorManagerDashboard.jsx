import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import DistributorManagerDashboardFilterContainer from './DistributorManagerDashboardFilterContainer';
import DistributorManagerDataContainer from './DistributorManagerDataContainer';
import { Roles } from '../../../../core/util';
import PermissionValidator from '../../../../core/layout/PermissionValidator';
import ActiveStudentsByMonthChartContainer from '../common/history/ActiveStudentsByMonthChartContainer';

const DistributorManagerDashboard = () => (
  <div>
    <div style={{marginLeft: -30, marginRight: -30, marginTop: -10}}>
      <Card>
        <DistributorManagerDashboardFilterContainer/>
      </Card>
    </div>
    <Separator size="lg"/>
    <DistributorManagerDataContainer/>
    <Separator size="md"/>
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT]}>
      <ActiveStudentsByMonthChartContainer/>
    </PermissionValidator>
  </div>
);

export default DistributorManagerDashboard;
