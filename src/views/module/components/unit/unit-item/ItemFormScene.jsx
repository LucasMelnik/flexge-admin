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
import Button from '../../../../../core/form/Button';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';

const ItemFormScene = props => (
  <div>
    <InlineBlock opacity={props.reviewId ? 0 : 1}>
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
    <InlineBlock
      marginTop={15}
      float="right"
    >
    <Button
      icon="keyboard_backspace"
      label="back"
      onClick={() => props.onBack()}
    />
    </InlineBlock>
    {props.unit.id && (
      <ItemFormContainer
        itemId={props.itemId}
        disabled={localStorage.role === 'ADMIN' ? false : props.unit.createdBy !== localStorage.id ? true : false}
        itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
        endpointUrl={`units/${props.unit.id}/items`}
        order={props.itemOrder}
        showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
        onSaveSuccess={props.onBack}
      />
    )}
  </div>
);

ItemFormScene.propTypes = {
  unit: PropTypes.object.isRequired,
  itemOrder: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  reviewId: PropTypes.string,
  disabled: PropTypes.bool,
};

ItemFormScene.defaultProps = {
  itemId: null,
  reviewId: null,
  disabled: false,
};

export default ItemFormScene;
