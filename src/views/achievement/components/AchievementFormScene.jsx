import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AchievementFormContainer from './AchievementFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const AchievementFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Achievements',
          link: '/achievements',
        },
        {
          text: props.params.achievementId ? 'Edit Achievement' : 'Create Achievement',
        },
      ]}
    />
    <Card
      title={props.params.achievementId ? 'Edit Achievement' : 'Create Achievement'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push('/achievements')}
          />
        )
      }
    >
      <AchievementFormContainer achievementId={props.params.achievementId} />
    </Card>
  </div>
);

AchievementFormScene.propTypes = {
  params: PropTypes.shape({
    achievementId: PropTypes.string,
  }),
};

AchievementFormScene.defaultProps = {
  params: null,
};

export default AchievementFormScene;
