import React from 'react';
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
  localStorage.role !== 'AUDIO_CONTENT' && (
    <div>
      <Separator size="xs" />
      <Card>
        <DashboardFilterContainer />
      </Card>
      <Separator size="sm" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '49.3%',
          }}
        >
          <Card title="Unit Type Amounts">
            <UnitTypeAmountsListContainer />
          </Card>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '49.3%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
            }}
          >
            <Card title="Time Amounts">
              <TimeAmountsListContainer />
            </Card>
          </div>
          <Separator />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
            }}
          >
            <Card title="Difficulty Level Amounts">
              <DifficultyLevelAmountsListContainer />
              <DifficultyLevelAverageContainer />
            </Card>
          </div>
          <Separator />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
            }}
          >
            <Card title="Score To Pass Amounts">
              <ScoreToPassAmountsListContainer />
              <ScoreToPassAverageContainer />
            </Card>
          </div>
        </div>
      </div>
      <Separator size="sm" />
    </div>
  )
);

export default DashboardScene;
