import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import MasteryTestFormContainer from './MasteryTestFormContainer';
import MasteryTestItems from './MasteryTestItems';

const MasteryTestFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.params.masteryTestId ? (
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
      onClick={() => browserHistory.push(`/modules/${props.params.moduleId}/units`)}
    />
    <Separator size="sm" />
    <MasteryTestFormContainer
      moduleId={props.params.moduleId}
      masteryTestId={props.params.masteryTestId}
    />
    <Separator size="sm" />
    {props.params.masteryTestId && (
      <MasteryTestItems masteryTestId={props.params.masteryTestId} />
    )}
  </div>
);

MasteryTestFormScene.propTypes = {
  params: PropTypes.shape({
    moduleId: PropTypes.string.isRequired,
    masteryTestId: PropTypes.string,
  }).isRequired,
};

export default MasteryTestFormScene;
