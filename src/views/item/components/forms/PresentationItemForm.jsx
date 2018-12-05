import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import FileInput from '../../../../core/form/FileInput';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';

const PresentationItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          label="Title (The field is just required for Vocabulary units.)"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          description={get(props.errors, 'title', '')}
          fieldValidation={get(props.errors, 'title', null) && 'error'}
        />
      </Column>
    </Row>
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
    {(props.showPostPhrase && !props.isTestItem) && (
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
          <Audios
            audioPath="postPhraseAudio"
            generatedAudioPath="generatedPostPhraseAudio"
            values={props.values}
            disabled={props.disabled}
            onChange={props.onChange}
            errors={props.errors}
          />
        </Column>
      </Row>
    )}
  </div>
);

PresentationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
  showPostPhrase: PropTypes.bool,
};

PresentationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  showPostPhrase: false,
  disabled: false,
  isTestItem: false,
};

export default PresentationItemForm;
