import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Answers from './Answers';
import { isRequired } from '../../../core/validations';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class AnswersContainer extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    needCorrectAnswer: PropTypes.bool,
  };

  static defaultProps = {
    needCorrectAnswer: false,
  };

  formService = new FormService();
  state = { answers: [] }

  componentWillMount() {
    this.formService.validations = {
      text: [isRequired],
    };
    this.formService.setInitialValues({ correct: false });
  }

  handleSubmit = () => {
    if (this.formService.errors) {
      return;
    }

    let updatedAnswers = [];
    if (!this.formService.getValue('id')) {
      updatedAnswers = [
        ...this.state.answers,
        {
          id: new Date().toISOString(),
          ...this.formService.getValues(),
        },
      ];
    } else {
      updatedAnswers = this.state.answers.map(answer => {
        if (answer.id === this.formService.getValue('id')) {
          return this.formService.getValues();
        }
        return answer;
      });
    }
    this.setState({
      answers: updatedAnswers
    });
    this.formService.setInitialValues({ correct: false });
    this.formService.reset();
    this.props.onChange(updatedAnswers);
  }

  handleEdit = (id) => {
    this.formService.setInitialValues(this.state.answers.find(answer => answer.id === id));
  }

  handleDelete = (id) => {
    ConfirmationDialogService.show(
      'Delete Answer',
      'You are about to delete the answer, are you sure ?',
      () => {
        const updatedAnswers = this.state.answers.filter(answer => answer.id !== id);
        this.setState({
          answers: updatedAnswers,
        });
        this.props.onChange(updatedAnswers);
      });
  }

  render() {
    return (
      <Answers
        answers={this.state.answers}
        onSubmit={this.handleSubmit}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        onChange={this.formService.setValue}
        onReset={this.formService.reset}
        values={this.formService.getValues()}
        errors={this.formService.errors}
        isDirty={this.formService.isDirty}
        needCorrectAnswer={this.props.needCorrectAnswer}
      />
    )
  }
}

export default observer(AnswersContainer);