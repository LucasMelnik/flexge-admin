import React from 'react';
import PropTypes from 'prop-types';
import { Stepper as MaterialStepper, Step, StepLabel } from 'material-ui';
import Button from '../form/Button';

const Stepper = props => (
  <div>
    <MaterialStepper activeStep={props.currentStep}>
      {props.steps.map(step => (
        <Step key={`step ${step.label}`}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </MaterialStepper>
    <div style={{ padding: '0 20px' }}>
      {props.steps[props.currentStep] && props.steps[props.currentStep].content}
    </div>
    <div style={{ margin: '12px 0' }}>
      <Button
        raised={false}
        disabled={props.currentStep === 0 || props.submitting || props.disabled}
        onClick={props.onBackClick}
        style={{ marginRight: 12 }}
      >
        Back
      </Button>
      <Button
        colored
        onClick={props.onNextClick}
        disabled={props.submitting || props.disabled}
      >
        {props.currentStep + 1 === props.steps.length ? 'Finish' : 'Next'}
      </Button>
    </div>
  </div>
);

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })).isRequired,
  onNextClick: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

Stepper.defaultProps = {
  submitting: false,
  disabled: false,
};

export default Stepper;
