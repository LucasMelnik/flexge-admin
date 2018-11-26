import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationContainer from '../inputs/TranslationInputContainer';
import AnswersInputContainer from '../inputs/AnswersInputContainer';
import SlicesInputContainer from '../inputs/SlicesInputContainer';
import Audios from '../inputs/Audios';

const GapFillLetterItemForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <Audios
      audioPath="audio"
      generatedAudioPath="generatedAudio"
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
      onChange={props.onChange}
      errors={props.errors}
    />
    <SlicesInputContainer
      onSplit={value => [...value]}
      onChange={(answers) => {
        props.onChange('answers', answers);
        props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); // this is to show errors
      }}
      text={get(props.values, 'text', '')}
      value={get(props.values, 'answers', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      disabled={props.disabled}
      maxRemovesAllowed={1}
    />
    <AnswersInputContainer
      answerType="WRONG"
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      disabled={props.disabled}
    />
  </div>
);

GapFillLetterItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

GapFillLetterItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default GapFillLetterItemForm;
