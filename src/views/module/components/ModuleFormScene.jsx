import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import { browserHistory } from 'react-router';
import ModuleFormContainer from './ModuleFormContainer';

const ModuleFormScene = props => (
  <div>
    <InlineBlock>
      <Stepper activeStep={1} connector={<ArrowForwardIcon />}>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push('/modules')}
        >
          <StepLabel>Modules</StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {props.moduleId ? 'Edit Module' : 'New Module'}
          </StepLabel>
        </Step>
      </Stepper>
    </InlineBlock>
    <ModuleFormContainer />
  </div>
);

ModuleFormScene.propTypes = {
  moduleId: PropTypes.string,
};

ModuleFormScene.defaultProps = {
  moduleId: null,
};

export default ModuleFormScene;
