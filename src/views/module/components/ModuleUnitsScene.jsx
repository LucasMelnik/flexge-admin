import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Block from 'jsxstyle/Block';
import InlineBlock from 'jsxstyle/InlineBlock';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Spinner from '../../../core/content/Spinner';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Button from '../../../core/form/Button';
import UnitListContainer from './unit/UnitListContainer';

const ModuleUnitsScene = props => (
  <div>
    <InlineBlock width={280}>
      <Stepper activeStep={1} connector={<ArrowForwardIcon />}>
        <Step
          onClick={() => browserHistory.push('/modules')}
          style={{ cursor: 'pointer' }}
        >
          <StepLabel>Modules</StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {props.fetching ? (
              <Spinner size={20} />
            ) : `Module - ${props.module.name}`}
          </StepLabel>
        </Step>
      </Stepper>
    </InlineBlock>
    <InlineBlock verticalAlign="top" marginTop={18} marginLeft={15}>
      <Button
        primary
        onClick={() => browserHistory.push(`/modules/${props.module.id}/units/new`)}
        label="Add new unit"
      />
    </InlineBlock>
    {props.module.id && (
      <UnitListContainer moduleId={props.module.id} />
    )}
  </div>
);

ModuleUnitsScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  fetching: PropTypes.bool,
};

ModuleUnitsScene.defaultProps = {
  module: {},
  fetching: false,
};

export default ModuleUnitsScene;
