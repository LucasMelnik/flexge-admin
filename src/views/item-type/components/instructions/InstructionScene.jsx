import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../../core/layout/Card';
import InstructionListContainer from './InstructionListContainer';
import Button from '../../../../core/form/Button';
import InstructionFormContainer from './InstructionFormContainer';

export default class Instruction extends React.Component {
  static propTypes = {
    itemTypeId: PropTypes.string.isRequired,
  };

  state = { currentState: 'LIST', currentInstruction: null };

  handleChangeToForm = (instruction) => {
    this.setState({
      currentState: 'FORM',
      currentInstruction: get(instruction, 'id', null),
    });
  };

  handleChangeToList = () => {
    this.setState({
      currentState: 'LIST',
      currentInstruction: null,
    });
  };

  render() {
    if (this.state.currentState === 'LIST') {
      return (
        <Card
          title="Instructions"
          actions={
            <Button
              type="primary"
              label="New instruction"
              icon="plus"
              onClick={this.handleChangeToForm}
            />
          }
        >
          <InstructionListContainer
            itemTypeId={this.props.itemTypeId}
            onEdit={this.handleChangeToForm}
          />
        </Card>
      );
    }
    if (this.state.currentState === 'FORM') {
      return (
        <Card
          title={this.state.currentInstruction ? 'Edit Instruction' : 'New Instruction'}
          actions={
            <Button
              icon="arrow-left"
              label="Back"
              type="default"
              onClick={this.handleChangeToList}
            />
          }
        >
          <InstructionFormContainer
            itemTypeId={this.props.itemTypeId}
            instructionId={this.state.currentInstruction}
            onSuccess={this.handleChangeToList}
          />
        </Card>
      );
    }
    return null;
  }
}

