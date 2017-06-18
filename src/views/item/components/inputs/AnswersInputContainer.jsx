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
    answerType: PropTypes.oneOf([
      'CORRECT',
      'WRONG',
      'BOTH',
    ]),
    defaultAnswers: PropTypes.arrayOf(PropTypes.string),
    errorText: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    })),
  };

  static defaultProps = {
    answerType: 'BOTH',
    defaultAnswers: [],
    errorText: null,
    value: [],
  };

  formService = new FormService();
  state = { answers: [], defaultAnswers: [] }

  componentWillMount() {
    this.formService.validations = {
      text: [isRequired],
    };
    this.formService.setInitialValues({ correct: this.props.answerType === 'CORRECT' });
    this.setState({
      answers: this.props.value,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultAnswers) {
      this.setState({
        defaultAnswers: nextProps.defaultAnswers.map((text, index) => {
          return {
            text,
            id: `default-${index}`,
            correct: true,
          }
        }),
      });
    }
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
    }, () => {
      this.handleReset();
      this.props.onChange([
        ...updatedAnswers,
        ...this.state.defaultAnswers,
      ]);
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
          this.props.onChange([
            ...updatedAnswers,
            ...this.state.defaultAnswers,
          ]);
        });
      });
  };

  render() {
    return (
      <AnswersInput
        answers={[
          ...this.state.answers,
          ...this.state.defaultAnswers,
        ]}
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
      />
    );
  }
}

export default observer(AnswersInputContainer);