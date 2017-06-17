import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationContainer from '../inputs/TranslationContainer';
import AnswersContainer from "../inputs/AnswersContainer";
import SlicesToRemoveContainer from "../inputs/SlicesToRemoveContainer";

const UnscramblePhraseForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
    <Separator size="xs" />
    <SlicesToRemoveContainer
      onChange={(slices, texts) => {
        props.onChange('indexesToRemove', slices);
        props.onChange('textsRemoved', texts);
      }}
      text={get(props.values, 'text', '')}
      errorText={get(props.errors, 'indexesToRemove', '')}
    />
    <Separator size="xs" />
    <AnswersContainer
      answerType="WRONG"
      defaultAnswers={get(props.values, 'textsRemoved', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
    />
  </div>
);

UnscramblePhraseForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UnscramblePhraseForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onChange: () => false,
};

export default UnscramblePhraseForm;