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
  };

  state = {
    answers: [
      {
        correct: true,
        text: 'This is True',
      },
      {
        correct: false,
        text: 'This is Not True',
      },
    ]
  };

  componentDidMount() {
    if (this.props.value.length) {
      this.setState({
        answers: this.props.value,
      });
    }
  }

  handleChange = () => {
    this.setState({
      answers: this.state.answers.map(answer => {
        answer.correct = !answer.correct;
        return answer;
      }),
    }, () => {
      this.props.onChange(this.state.answers);
    });
  };

  render() {
    return (
      <TrueFalseAnswerInput
        answers={this.state.answers}
        onChange={this.handleChange}
      />
    )
  }
}