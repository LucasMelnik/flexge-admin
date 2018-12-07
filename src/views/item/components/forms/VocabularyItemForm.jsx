import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';
import FileInput from '../../../../core/form/FileInput';
import TranslationInputContainer from '../inputs/TranslationInputContainer';

const VocabularyItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          label="Vocabulary"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          description={get(props.errors, 'text', '')}
          fieldValidation={get(props.errors, 'text', null) && 'error'}
        />
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        <Audios
          audioPath="audio"
          generatedAudioPath="generatedAudio"
          values={props.values}
          disabled={props.disabled}
          onChange={props.onChange}
          errors={props.errors}
        />
      </Column>
      <Column size={4}>
        <FileInput
          label="Upload an image to the item"
          accept="image"
          disabled={props.disabled}
          value={get(props.values, 'image', '')}
          onChange={key => props.onChange('image', key)}
          errorText={get(props.errors, 'image', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          label="Post Phrase"
          disabled={props.submitting}
          value={get(props.values, 'postPhrase', '')}
          onChange={value => props.onChange('postPhrase', value)}
          description={get(props.errors, 'postPhrase', '')}
          fieldValidation={get(props.errors, 'postPhrase', null) && 'error'}
        />
      </Column>
      <Column size={12}>
        <SpellCheckInputContainer
          onChange={props.onChange}
          submitting={props.submitting}
          values={props.values}
          textPath="postPhrase"
          disabled={props.disabled}
        />
      </Column>
    </Row>
    <Audios
      label="post phrase"
      audioPath="postPhraseAudio"
      generatedAudioPath="generatedPostPhraseAudio"
      values={props.values}
      disabled={props.disabled}
      onChange={props.onChange}
      errors={props.errors}
    />
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
    />
  </div>
);

VocabularyItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

VocabularyItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default VocabularyItemForm;
