import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import UnitAverageExecutionTimeListContainer from './UnitAverageExecutionTimeListContainer';
import UnitAverageExecutionTimeListFilterContainer from './UnitAverageExecutionTimeListFilterContainer';

const UnitAverageExecutionTimeListScene = () => (
  <div>
    <Card title="Items by words">
      <UnitAverageExecutionTimeListFilterContainer />
    </Card>
    <Separator />
    <Card>
      <UnitAverageExecutionTimeListContainer />
    </Card>
  </div>
);

export default UnitAverageExecutionTimeListScene;
