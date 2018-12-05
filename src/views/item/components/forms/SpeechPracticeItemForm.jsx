import React from 'react';
import PropTypes from 'prop-types';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';

const SpeechPracticeItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          required
          label="Text"
          fieldType="textarea"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
      </Column>
    </Row>
    {!props.isTestItem && (
      <TranslationInputContainer
        onChange={props.onChange}
        submitting={props.submitting}
        values={props.values}
        errors={props.errors}
        disabled={props.disabled}
      />
    )}
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
      disabled={props.disabled}
      onChange={props.onChange}
      errors={props.errors}
    />
  </div>
);

SpeechPracticeItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

SpeechPracticeItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
};

export default SpeechPracticeItemForm;
