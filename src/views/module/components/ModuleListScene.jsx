import React from 'react';
import { browserHistory } from 'react-router';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import ModuleListContainer from './ModuleListContainer';

const ModuleListScene = () => (
  <div>
    <Stepper activeStep={0} connector={<ArrowForwardIcon />}>
      <Step>
        <StepLabel>Modules</StepLabel>
      </Step>
    </Stepper>
    <FloatActionButton
      secondary
      icon="add"
      style={{ position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/modules/new')}
    />
    <ModuleListContainer />
    <Separator />
  </div>
);

export default ModuleListScene;
