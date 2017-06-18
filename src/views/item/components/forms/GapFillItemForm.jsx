import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationContainer from '../inputs/TranslationInputContainer';
import AnswersContainer from "../inputs/AnswersInputContainer";
import SlicesInputContainer from "../inputs/SlicesInputContainer";

const GapFillItemForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
    <Separator size="xs" />
    <SlicesInputContainer
      onChange={(slices, texts) => {
        props.onChange('indexesToRemove', slices);
        props.onChange('textsRemoved', texts);
      }}
      text={get(props.values, 'text', '')}
      indexesToRemove={get(props.values, 'indexesToRemove', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      maxRemovesAllowed={1}
    />
    <Separator size="xs" />
    <AnswersContainer
      answerType="WRONG"
      value={get(props.values, 'answers', [])}
      defaultAnswers={get(props.values, 'textsRemoved', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
    />
  </div>
);

GapFillItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

GapFillItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default GapFillItemForm;