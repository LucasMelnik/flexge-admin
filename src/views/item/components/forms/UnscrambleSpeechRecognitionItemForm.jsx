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
      onChange={(answers) => {
        props.onChange('answers', answers);
        props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); //this is to show errors
      }}
      text={get(props.values, 'text', '')}
      value={get(props.values, 'answers', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      allowLinkSlices
    />
    <Separator size="xs" />
    <AnswersInputContainer
      disabled
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
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
