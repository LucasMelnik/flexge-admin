import React from 'react';
import PropTypes from 'prop-types';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';

const PronunciationItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <SpellCheckInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      disabled={props.disabled}
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
  </div>
);

PronunciationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

PronunciationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default PronunciationItemForm;
