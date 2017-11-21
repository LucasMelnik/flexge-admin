import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import AchievementListFilterContainer from './AchievementListFilterContainer';
import AchievementListContainer from './AchievementListContainer';

const AchievementListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Achievements',
        },
      ]}
    />
    <Card
      title="Achievements"
      actions={
        <Button
          type="primary"
          label="New Achievement"
          icon="plus"
          onClick={() => browserHistory.push('/achievements/new')}
        />
      }
    >
      <AchievementListFilterContainer />
      <AchievementListContainer />
    </Card>
  </div>
);

export default AchievementListScene;
