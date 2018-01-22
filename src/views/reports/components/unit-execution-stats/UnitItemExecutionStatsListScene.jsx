import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import UnitItemExecutionStatsListFilterContainer from './UnitItemExecutionStatsListFilterContainer';
import UnitItemExecutionStatsListContainer from './UnitItemExecutionStatsListContainer';

const UnitItemExecutionStatsListScene = () => (
  <div>
    <Card>
      <UnitItemExecutionStatsListFilterContainer />
    </Card>
    <Separator />
    <Card title="Unit Items Execution Stats">
      <UnitItemExecutionStatsListContainer />
    </Card>
  </div>
);

export default UnitItemExecutionStatsListScene;
