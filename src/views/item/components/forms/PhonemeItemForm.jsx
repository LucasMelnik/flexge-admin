import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';
import FileInput from '../../../../core/form/FileInput';
import TranslationContainer from '../inputs/TranslationInputContainer';

const PhonemeItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          label="Letter/Phoneme"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          description={get(props.errors, 'title', '')}
          fieldValidation={get(props.errors, 'title', null) && 'error'}
        />
      </Column>
    </Row>
    <Audios
      label="title"
      audioPath="titleAudio"
      generatedAudioPath="generatedTitleAudio"
      values={props.values}
      disabled={props.disabled}
      onChange={props.onChange}
      errors={props.errors}
    />
    <Row>
      <Column size={12}>
        <TextInput
          label="Example"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          description={get(props.errors, 'text', '')}
          fieldValidation={get(props.errors, 'text', null) && 'error'}
        />
      </Column>
    </Row>
    <Row>
      <Column size={6}>
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
    <Row>
      <Column size={6}>
        <Audios
          label="post phrase"
          audioPath="postPhraseAudio"
          generatedAudioPath="generatedPostPhraseAudio"
          values={props.values}
          disabled={props.disabled}
          onChange={props.onChange}
          errors={props.errors}
        />
      </Column>
    </Row>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
    />
  </div>
);

PhonemeItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

PhonemeItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default PhonemeItemForm;
