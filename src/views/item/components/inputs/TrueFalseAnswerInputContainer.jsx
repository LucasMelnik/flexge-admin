import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TrueFalseAnswerInput from "./TrueFalseAnswerInput";

export default class TrueFalseAnswerInputContainer extends Component {

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  }

  state = { checked: false, answers: [] };

  componentWillMount() {
    if (this.props.value.length) {
      this.setState({
        checked: this.props.value[0].correct,
        answers: this.props.value,
      });
    } else {
      const answers = [
        {
          correct: false,
          text: 'True',
        },
        {
          correct: true,
          text: 'Not True',
        },
      ];
      this.props.onChange(answers);
    }
  }

  componentWillReceiveProps() {
    if (this.props.value.length) {
      this.setState({
        checked: this.props.value[0].correct,
        answers: this.props.value,
      });
    }
  }

  handleChange = (checked) => {
    let answers = null;
    if (this.state.answers.length) {
      const isTrueAnswer = this.state.answers[0];
      const isFalseAnswer = this.state.answers[1];
      isTrueAnswer.correct = checked;
      isFalseAnswer.correct = !checked;
      answers = [
        isTrueAnswer,
        isFalseAnswer,
      ];
    } else {
      answers = [
        {
          correct: checked,
          text: 'True',
        },
        {
          correct: !checked,
          text: 'Not True',
        },
      ];
    }
    this.setState({
      checked,
      answers,
    });
    this.props.onChange(answers);
  };

  render() {
    return (
      <TrueFalseAnswerInput
        checked={this.state.checked}
        onChange={this.handleChange}
        disabled={this.props.disabled}
      />
    );
  }
}
