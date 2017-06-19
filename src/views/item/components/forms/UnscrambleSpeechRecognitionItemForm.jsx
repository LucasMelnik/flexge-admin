import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import AnswersInputContainer from '../inputs/AnswersInputContainer';
import SlicesInputContainer from '../inputs/SlicesInputContainer';

const UnscrambleSpeechRecognitionItemForm = props => (
  <div>
    <TranslationInputContainer
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
        props.onChange('answers', texts.map((text, index) => ({ text, correct: true, id: `${index}` })));
      }}
      text={get(props.values, 'text', '')}
      indexesToRemove={get(props.values, 'indexesToRemove', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      allowLinkSlices
    />
    <Separator size="xs" />
    <AnswersInputContainer
      disabled
      value={get(props.values, 'answers', [])}
      defaultAnswers={get(props.values, 'textsRemoved', [])}
      onChange={answers => props.onChange('answers', answers)}
    />
  </div>
);

UnscrambleSpeechRecognitionItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

UnscrambleSpeechRecognitionItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default UnscrambleSpeechRecognitionItemForm;
