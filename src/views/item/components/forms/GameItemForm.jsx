import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';
import FileInput from '../../../../core/form/FileInput';

const GameItemForm = props => (
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
    <SpellCheckInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      disabled={props.disabled}
    />
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
          onChange={(key) => props.onChange('image', key)}
          errorText={get(props.errors, 'image', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          label="Post Phrase"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'postPhrase', '')}
          onChange={value => props.onChange('postPhrase', value)}
          description={get(props.errors, 'postPhrase', '')}
          fieldValidation={get(props.errors, 'postPhrase', null) && 'error'}
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
      <Column size={4}>
        <FileInput
          label="Upload an image to the post phrase"
          accept="image"
          disabled={props.disabled}
          value={get(props.values, 'postPhraseImage', '')}
          onChange={key => props.onChange('postPhraseImage', key)}
          errorText={get(props.errors, 'postPhraseImage', '')}
        />
      </Column>
    </Row>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
    />
  </div>
);

GameItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  hasPostPhraseImage: PropTypes.bool,
};

GameItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  hasPostPhraseImage: false,
};

export default GameItemForm;
