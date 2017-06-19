import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Spinner from '../../../../../core/content/Spinner';
import FloatActionButton from '../../../../../core/form/FloatActionButton';
import Button from '../../../../../core/form/Button';
import UnitItemsContainer from './UnitItemsContainer';
import ItemFormService from '../../../../item/services/ItemFormService';
import ItemFormModal from './ItemFormModal';

class UnitItemsScene extends Component {

  state = { itemFormModalOpen: false };

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      module: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    fetching: PropTypes.bool,
  };

  static defaultProps = {
    unit: {
      module: {},
    },
    fetching: false,
  };

  handleAddClick = () => {
    ItemFormService.handleLoad();
    this.handleToggleModal();
  };

  handleToggleModal = () => {
    this.setState({
      itemFormModalOpen: !this.state.itemFormModalOpen,
    });
  };

  render() {
    return (
      <div>
        <ItemFormModal
          isOpen={this.state.itemFormModalOpen}
          onClose={this.handleToggleModal}
        />
        <InlineBlock width={600}>
          <Stepper activeStep={2} connector={<ArrowForwardIcon />}>
            <Step
              style={{ cursor: 'pointer' }}
              onClick={() => browserHistory.push('/modules')}
            >
              <StepLabel>Modules</StepLabel>
            </Step>
            <Step
              style={{ cursor: 'pointer' }}
              onClick={() => browserHistory.push(`/modules/${this.props.unit.module.id}/units`)}
            >
              <StepLabel>Module - {get(this.props, 'unit.module.name', '')}</StepLabel>
            </Step>
            <Step>
              <StepLabel>
                {this.props.fetching ? (
                  <Spinner size={20} />
                ) : `Unit - ${this.props.unit.name}`}
              </StepLabel>
            </Step>
          </Stepper>
        </InlineBlock>
        <InlineBlock verticalAlign="top" marginTop={18} marginLeft={15}>
          <Button
            primary
            onClick={this.handleAddClick}
            label="Add new item"
          />
        </InlineBlock>
        {this.props.unit.id && (
          <UnitItemsContainer
            unitId={this.props.unit.id}
            onToggleModal={this.handleToggleModal}
          />
        )}
      </div>
    );
  }
}


export default UnitItemsScene;
