import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import { Step, StepLabel, Stepper, } from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Spinner from '../../../../../core/content/Spinner';
import Button from '../../../../../core/form/Button';
import UnitItemListContainer from './UnitItemListContainer';
import ModuleItemListContainer from '../../ModuleItemListContainer';
import Separator from '../../../../../core/layout/Separator';
import Title from '../../../../../core/content/Title';

export default class UnitReviewItemListScene extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      module: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    module: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      course: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    fetching: PropTypes.bool,
  };

  static defaultProps = {
    unit: {
      module: {},
    },
    module: {
      course: {},
    },
    fetching: false,
  };

  render() {
    return (
      <div>
        <InlineBlock>
          <Stepper activeStep={4} connector={<ArrowForwardIcon />}>
            <Step>
              <StepLabel>
                {`Course - ${this.props.module.course.name}`}
              </StepLabel>
            </Step>
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
                ) : `Unit Review - ${this.props.unit.name}`}
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                Items of Review
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
            onClick={() => browserHistory.push(`/modules/${this.props.unit.module.id}/units`)}
          />
        </InlineBlock>
        {this.props.unit.id && (
          <UnitItemListContainer
            unit={this.props.unit}
          />
        )}
        <Separator />
        <Title>Available Items to review</Title>
        <Separator />
        {this.props.unit.id && (
          <ModuleItemListContainer
            moduleId={this.props.module.id}
            unit={this.props.unit}
          />
        )}
      </div>
    );
  }
}
