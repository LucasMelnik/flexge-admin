import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import MasteryTestFormContainer from './MasteryTestFormContainer';
import MasteryTestItemsSceneContainer from './MasteryTestItemsSceneContainer';

const MasteryTestFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.masteryTestId ? (
          'Mastery Test informations'
        ) : (
          'New Mastery Test'
        )}
      </Title>
    </InlineBlock>
    <Button
      label="Back"
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
      }}
      onClick={() => browserHistory.push(`/modules/${props.moduleId}/units`)}
    />
    <Separator size="sm" />
    <MasteryTestFormContainer
      moduleId={props.moduleId}
    />
    <Separator size="sm" />
    <MasteryTestItemsSceneContainer
      masteryTestId={props.masteryTestId}
      order={props.order}
    />
  </div>
);

MasteryTestFormScene.propTypes = {
  masteryTestId: PropTypes.string,
  moduleId: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
};
MasteryTestFormScene.defaultProps = {
  masteryTestId: null,
};

export default MasteryTestFormScene;
