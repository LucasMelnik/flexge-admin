import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentMasteryListContainer from './StudentMasteryListContainer';
import StudentMasteryResultListContainer from './StudentMasteryResultListContainer';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';

export default class StudentMasteryDetails extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  state = { currentState: 'LIST', currentMastery: '' };

  handleSelectMastery = (idMastery) => {
    this.setState({
      currentMastery: idMastery,
      currentState: 'DETAIL',
    });
  };

  handleBack = () => {
    this.setState({
      currentMastery: null,
      currentState: 'LIST',
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
            <Button
              label="Back"
              icon="fa fa-arrow-left"
              onClick={this.handleBack}
            />
            <Separator />
            <StudentMasteryResultListContainer
              masteryId={this.state.currentMastery.id}
            />
          </div>
        }
      </div>
    );
  }
}
