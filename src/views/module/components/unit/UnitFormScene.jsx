import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Title from '../../../../core/content/Title';
import Separator from '../../../../core/layout/Separator';
import FloatActionButton from '../../../../core/form/FloatActionButton';
import UnitFormContainer from './UnitFormContainer';
import UnitQuestionContainer from '../../../unit-item/components/UnitItemsContainer';

const UnitFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.unitId ? (
          'Unit informations'
        ) : (
          'New Unit'
        )}
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push(`/modules/${props.moduleId}`)}
    />
    <Separator size="sm" />
    <UnitFormContainer />
    <Separator size="sm" />
    {props.unitId && (
      <UnitQuestionContainer
        unitId={props.unitId}
      />
    )}
  </div>
);

UnitFormScene.propTypes = {
  unitId: PropTypes.string,
  moduleId: PropTypes.string.isRequired,
};
UnitFormScene.defaultProps = {
  unitId: null,
};

export default UnitFormScene;
