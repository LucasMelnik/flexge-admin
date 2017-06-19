import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import UnitFormContainer from './UnitFormContainer';
import Button from '../../../../core/form/Button';

const UnitFormScene = props => (
  <div>
    <InlineBlock>
      <Stepper activeStep={2} connector={<ArrowForwardIcon />}>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push('/modules')}
        >
          <StepLabel>Modules</StepLabel>
        </Step>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push(`/modules/${props.moduleId}/units`)}
        >
          <StepLabel>Module - {get(props, 'module.name', '')}</StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {props.unitId ? 'Edit Unit' : 'New Unit'}
          </StepLabel>
        </Step>
      </Stepper>
    </InlineBlock>
    <InlineBlock
      marginTop={15}
      float="right"
    >
      <Button
        icon="keyboard_backspace"
        label="back"
        onClick={() => browserHistory.push(`/modules/${props.moduleId}/units`)}
      />
    </InlineBlock>
    <UnitFormContainer currentModule={props.module} />
  </div>
);

UnitFormScene.propTypes = {
  unitId: PropTypes.string,
  moduleId: PropTypes.string.isRequired,
  module: PropTypes.object,
};
UnitFormScene.defaultProps = {
  unitId: null,
  module: {},
};

export default UnitFormScene;
