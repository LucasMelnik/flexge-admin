import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';
import StudentMasteryListContainer from './StudentMasteryListContainer';
import StudentMasteryResultListContainer from './StudentMasteryResultListContainer';
import StudentMasteryResultItemListContainer from './StudentMasteryResultItemListContainer';

export default class StudentMasteryDetails extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  state = { currentState: 'LIST', currentMastery: null };

  handleSelectMastery = (mastery) => {
    this.setState({
      currentMastery: mastery,
      currentExecution: null,
      currentState: 'DETAIL',
    });
  };

  handleSelectExecution = (execution) => {
    this.setState({
      currentExecution: execution,
      currentState: 'EXECUTION_DETAIL',
    });
  };

  handleBack = () => {
    this.setState({
      currentMastery: null,
      currentExecution: null,
      currentState: 'LIST',
    });
  };

  handleBackMastery = () => {
    this.setState({
      currentExecution: null,
      currentState: 'DETAIL',
    });
  };

  render() {
    return (
      <div>
        {this.state.currentState === 'LIST' &&
          <StudentMasteryListContainer
            studentId={this.props.studentId}
            onSelect={this.handleSelectMastery}
          />
        }
        {this.state.currentState === 'DETAIL' &&
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                label="Back"
                icon="arrow-left"
                onClick={this.handleBack}
              />
            </div>
            <Separator />
            <StudentMasteryResultListContainer
              studentId={this.props.studentId}
              masteryId={this.state.currentMastery.id}
              onSelect={this.handleSelectExecution}
            />
          </div>
        }
        {this.state.currentState === 'EXECUTION_DETAIL' &&
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                label="Back"
                icon="arrow-left"
                onClick={this.handleBackMastery}
              />
            </div>
            <Separator />
            <StudentMasteryResultItemListContainer
              studentId={this.props.studentId}
              masteryId={this.state.currentMastery.id}
              executionId={this.state.currentExecution.id}
            />
          </div>
        }
      </div>
    );
  }
}
