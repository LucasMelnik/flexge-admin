import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Flex from 'jsxstyle/Flex';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Spinner from '../../../core/content/Spinner';
import Button from '../../../core/form/Button';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import UnitListContainer from './unit/UnitListContainer';
import MasteryTestListContainer from '../../mastery-test/components/MasteryTestListContainer';

const ModuleUnitsScene = props => (
  <div>
    <InlineBlock>
      <Stepper activeStep={3} connector={<ArrowForwardIcon />}>
        <Step>
          <StepLabel>
            {props.fetching ? (
              <Spinner size={20} />
            ) : `Course - ${props.module.course.name}`}
          </StepLabel>
        </Step>
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
        <Step>
          <StepLabel>
            Module details
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
        onClick={() => browserHistory.push('/modules')}
      />
      {' '}
      {(localStorage.role === 'ADMIN' || (props.module.createdBy && (props.module.createdBy.id === localStorage.id))) && (
        <Button
          icon="add"
          primary
          onClick={() => browserHistory.push(`/modules/${props.module.id}/units/new`)}
          label="New Unit"
        />
      )}
    </InlineBlock>
    {props.module.id && (
      <div>
        <Flex>
          <Title>Mastery Test</Title>
          <Button
            style={{
              marginLeft: 'auto',
            }}
            icon="add"
            primary
            onClick={() => browserHistory.push(`/modules/${props.module.id}/mastery-tests/new`)}
            label="New Mastery Test"
          />
        </Flex>
        <Separator />
        <MasteryTestListContainer moduleId={props.module.id} />
        <Separator />
        <Flex>
          <Title>Units</Title>
          <Button
            style={{
              marginLeft: 'auto',
            }}
            icon="add"
            primary
            onClick={() => browserHistory.push(`/modules/${props.module.id}/units/new`)}
            label="New Unit"
          />
        </Flex>
        <Separator />
        <UnitListContainer moduleId={props.module.id} />
      </div>
    )}
  </div>
);

ModuleUnitsScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.object,
  }),
  fetching: PropTypes.bool,
};

ModuleUnitsScene.defaultProps = {
  module: {},
  fetching: false,
};

export default ModuleUnitsScene;
