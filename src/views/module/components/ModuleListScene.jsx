import React from 'react';
import { browserHistory } from 'react-router';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import InlineBlock from 'jsxstyle/InlineBlock';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import ModuleListContainer from './ModuleListContainer';

const ModuleListScene = () => (
  <div>
    <InlineBlock>
      <Stepper activeStep={0} connector={<ArrowForwardIcon />}>
        <Step>
          <StepLabel>Modules</StepLabel>
        </Step>
      </Stepper>
    </InlineBlock>

    <InlineBlock verticalAlign="top" marginTop={18} marginLeft={15}>
      <Button
        primary
        onClick={() => browserHistory.push('/modules/new')}
        label="New module"
      />
    </InlineBlock>
    <ModuleListContainer />
    <Separator />
  </div>
);

export default ModuleListScene;
