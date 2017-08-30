import React from 'react';
import Flex from 'jsxstyle/Flex';
import Separator from '../../../core/layout/Separator';
import Card from '../../../core/layout/Card';
import UnitTypeAmountsListContainer from './UnitTypeAmountsListContainer';
import DifficultyLevelAmountsListContainer from './DifficultyLevelAmountsListContainer';
import DifficultyLevelAverageContainer from './DifficultyLevelAverageContainer';
import TimeAmountsListContainer from './TimeAmountsContainer';
import ScoreToPassAmountsListContainer from './ScoreToPassAmountsListContainer';
import ScoreToPassAverageContainer from './ScoreToPassAverageContainer';
import DashboardFilterContainer from './DashboardFilterContainer';

const DashboardScene = () => (
  <div>
    <Separator size="xs" />
    <Card>
      <DashboardFilterContainer />
    </Card>
    <Separator size="sm" />
    <Flex
      justifyContent="space-between"
    >
      <Flex
        width="49.3%"
      >
        <Card title="Unit Type Amounts">
          <UnitTypeAmountsListContainer />
        </Card>
      </Flex>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        width="49.3%"
      >
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <Card title="Time Amounts">
            <TimeAmountsListContainer />
          </Card>
        </Flex>
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <Card title="Difficulty Level Amounts">
            <DifficultyLevelAmountsListContainer />
            <DifficultyLevelAverageContainer />
          </Card>
        </Flex>
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <Card title="Score To Pass Amounts">
            <ScoreToPassAmountsListContainer />
            <ScoreToPassAverageContainer />
          </Card>
        </Flex>
      </Flex>
    </Flex>
    <Separator size="sm" />
  </div>
);

export default DashboardScene;
