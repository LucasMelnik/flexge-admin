import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AnswersInput from './AnswersInput';
import { isRequired } from '../../../../core/validations/index';
import FormService from '../../../../core/services/FormService';
import ConfirmationDialogService from '../../../../core/services/ConfirmationDialogService';

class AnswersInputContainer extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    allowSpellCheck: PropTypes.bool,
    answerType: PropTypes.oneOf([
      'CORRECT',
      'WRONG',
      'BOTH',
    ]),
    errorText: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    })),
    type: PropTypes.oneOf([
      'SINGLE_CHOICE_TEXT',
      'SINGLE_CHOICE_AUDIO',
      'SINGLE_CHOICE_IMAGE']),
  };

  static defaultProps = {
    answerType: 'BOTH',
    label: 'Add Other Answers',
    errorText: null,
    type: null,
    disabled: false,
    allowSpellCheck: false,
    value: [],
  };

  formService = new FormService();
  state = { answers: [] };

  componentWillMount() {
    this.formService.validations = {
      text: [isRequired],
    };
    this.formService.setInitialValues({ correct: this.props.answerType === 'CORRECT' });
    this.setState({
      answers: this.props.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        answers: nextProps.value,
      });
    }
  }

  getNormalizedAnswers = () => {
    return this.state.answers.reduce((result, answer) => {
      if (result.find(resultAnswer => answer.index && resultAnswer.linkTo === answer.index)) {
        result = result.map((resultAnswer) => {
          if (resultAnswer.linkTo === answer.index) {
            return {
              ...resultAnswer,
              linkTo: answer.linkTo,
              text: resultAnswer.text.concat(' ').concat(answer.text),
            }
          }
          return resultAnswer;
        });
        return [
          ...result,
        ];
      } else {
        return [
          ...result,
          answer,
        ];
      }
    }, []);
  };

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
    }, () => {
      this.handleReset();
      this.props.onChange(updatedAnswers);
    });
  };

  handleEdit = (id) => {
    this.formService.setInitialValues(this.state.answers.find(answer => answer.id === id));
  };

  handleReset = () => {
    this.formService.setInitialValues({ correct: this.props.answerType === 'CORRECT' });
    this.formService.reset();
  };

  handleDelete = (id) => {
    ConfirmationDialogService.show(
      'Delete Answer',
      'You are about to delete the answer, are you sure ?',
      () => {
        const updatedAnswers = this.state.answers.filter(answer => answer.id !== id);
        this.setState({
          answers: updatedAnswers,
        }, () => {
          this.props.onChange(updatedAnswers);
        });
      });
  };

  render() {
    return (
      <AnswersInput
        answers={this.getNormalizedAnswers()}
        onSubmit={this.handleSubmit}
        onDelete={this.handleDelete}
        onEdit={this.handleEdit}
        onReset={this.handleReset}
        onChange={this.formService.setValue}
        values={this.formService.getValues()}
        errors={this.formService.errors}
        isDirty={this.formService.isDirty}
        answerType={this.props.answerType}
        errorText={this.props.errorText}
        label={this.props.label}
        type={this.props.type}
        disabled={this.props.disabled}
        allowSpellCheck={this.props.allowSpellCheck}
      />
    );
  }
}

export default observer(AnswersInputContainer);
