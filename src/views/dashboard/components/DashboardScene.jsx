import React from 'react';
import Flex from 'jsxstyle/Flex';
import Title from '../../../core/content/Title';
import PermissionValidator from '../../../core/content/PermissionValidator';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import UnitReviewListScene from '../../unit-review/components/UnitReviewListScene';
import UnitTypeAmountsListContainer from './UnitTypeAmountsListContainer';
import DifficultyLevelAmountsListContainer from  './DifficultyLevelAmountsListContainer';
import DifficultyLevelAverageContainer from  './DifficultyLevelAverageContainer';
import TimeAmountsListContainer from './TimeAmountsListContainer';
import TimeAverageContainer from './TimeAverageContainer';
import ScoreToPassAmountsListContainer from './ScoreToPassAmountsListContainer';
import ScoreToPassAverageContainer from './ScoreToPassAverageContainer';
import DashboardFilterContainer from './DashboardFilterContainer';

const DashboardScene = () => (
  <div>
    <Title>
      Dashboard
    </Title>
    <Separator size="xs" />
    <PermissionValidator allowedFor={['CONTENT_ADMIN']}>
      <div>
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
        <Flex
          flexDirection="column"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px"
        >
          <Flex
            justifyContent="space-between"
          >
            <Flex
            >
              <TimeAmountsListContainer from={0} to={5} />
            </Flex>
            <Flex
            >
              <TimeAmountsListContainer from={5} to={10} />
            </Flex>
            <Flex
            >
              <TimeAmountsListContainer from={10} to={15} />
            </Flex>
            <Flex
            >
              <TimeAmountsListContainer from={15} to={20} />
            </Flex>
          </Flex>
          <Divider />
          <TimeAverageContainer />
        </Flex>
        <Separator size="sm" />
      </div>
    </PermissionValidator>
    <UnitReviewListScene />
  </div>
);

export default DashboardScene;
