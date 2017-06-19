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
import ItemFormContainer from '../../../../item/components/ItemFormContainer';

const ItemFormScene = props => (
  <div>
    <InlineBlock>
      <Stepper activeStep={3} connector={<ArrowForwardIcon />}>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push('/modules')}
        >
          <StepLabel>Modules</StepLabel>
        </Step>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push(`/modules/${props.unit.module.id}/units`)}
        >
          <StepLabel>Module - {get(props, 'unit.module.name', '')}</StepLabel>
        </Step>
        <Step
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push(`/modules/${props.unit.module.id}/units/${props.unit.id}/items`)}
        >
          <StepLabel>
            {`Unit - ${props.unit.name}`}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            {props.itemId ? 'Edit Item' : 'New Item'}
          </StepLabel>
        </Step>
      </Stepper>
    </InlineBlock>
    <ItemFormContainer />
  </div>
);

ItemFormScene.propTypes = {
  unit: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default ItemFormScene;