import React from 'react';
import PropTypes from 'prop-types';
import Row from "../../../../core/layout/Row";
import Column from "../../../../core/layout/Column";
import Switch from "../../../../core/form/Switch";

const TrueFalseAnswerInput = props => (
  <Row>
    <Column lgsize={12}>
      {props.answers.map(answer => (
        <Switch
          key={answer.text}
          onChange={props.onChange}
          label={answer.text}
          toggled={answer.correct}
          labelPosition="right"
        />
      ))}
    </Column>
  </Row>
);

TrueFalseAnswerInput.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    correct: PropTypes.bool.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrueFalseAnswerInput;