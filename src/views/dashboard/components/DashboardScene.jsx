import React from 'react';
import Flex from 'jsxstyle/Flex';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import UnitTypeAmountsListContainer from './UnitTypeAmountsListContainer';
import DifficultyLevelAmountsListContainer from './DifficultyLevelAmountsListContainer';
import DifficultyLevelAverageContainer from './DifficultyLevelAverageContainer';
import TimeAmountsListContainer from './TimeAmountsContainer';
import ScoreToPassAmountsListContainer from './ScoreToPassAmountsListContainer';
import ScoreToPassAverageContainer from './ScoreToPassAverageContainer';
import DashboardFilterContainer from './DashboardFilterContainer';

const DashboardScene = () => (
  <div>
    <Title>
      Dashboard
    </Title>
    <Separator size="xs" />
    <DashboardFilterContainer />
    <Separator size="sm" />
    <Flex
      justifyContent="space-between"
    >
      <Flex
        width="49.3%"
      >
        <UnitTypeAmountsListContainer />
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
          <TimeAmountsListContainer />
        </Flex>
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <DifficultyLevelAmountsListContainer />
          <Divider />
          <DifficultyLevelAverageContainer />
        </Flex>
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <ScoreToPassAmountsListContainer />
          <Divider />
          <ScoreToPassAverageContainer />
        </Flex>
      </Flex>
    </Flex>
    <Separator size="sm" />
  </div>
);

export default DashboardScene;
