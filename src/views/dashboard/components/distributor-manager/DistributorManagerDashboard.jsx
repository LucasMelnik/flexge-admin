import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Card from '../../../../core/layout/Card';
import DistributorManagerDashboardFilterContainer from './DistributorManagerDashboardFilterContainer';
import DistributorManagerDataContainer from './DistributorManagerDataContainer';

const DistributorManagerDashboard = () => (
  <div>
    <div style={{marginLeft: -30, marginRight: -30, marginTop: -10}}>
      <Card>
        <DistributorManagerDashboardFilterContainer/>
      </Card>
    </div>
    <Separator size="lg"/>
    <DistributorManagerDataContainer/>
  </div>
);

export default DistributorManagerDashboard;
