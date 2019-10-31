import React from 'react';
import Card from '../../../../core/layout/Card';
import Separator from '../../../../core/layout/Separator';
import MasteryTestItemExecutionStatsListContainer from './MasteryTestItemExecutionStatsListContainer';
import MasteryTestItemExecutionStatsListFilterContainer from './MasteryTestItemExecutionStatsListFilterContainer';

const MasteryTestItemExecutionStatsListScene = () => (
  <div>
    <Card>
      <MasteryTestItemExecutionStatsListFilterContainer />
    </Card>
    <Separator />
    <Card title="Mastery Items Execution Stats">
      <MasteryTestItemExecutionStatsListContainer />
    </Card>
  </div>
);

export default MasteryTestItemExecutionStatsListScene;
