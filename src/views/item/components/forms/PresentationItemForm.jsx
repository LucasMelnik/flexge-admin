import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import FileInput from '../../../../core/form/FileInput';
import AudioPreview from '../../../../core/layout/AudioPreview';

const PresentationItemForm = props => (
  <div>
    <Row>
      <Column lgSize={12}>
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
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <Row>
      {get(props.values, 'generatedAudio', null) && (
        <Column lgSize={2}>
          <p>Generated Audio</p>
          <AudioPreview src={get(props.values, 'generatedAudio', '')} />
        </Column>
      )}
      <Column lgSize={4}>
        <FileInput
          label="Upload an audio to the item"
          accept="audio"
          disabled={props.disabled}
          value={get(props.values, 'audio', '')}
          onChange={(key) => props.onChange('audio', key)}
          errorText={get(props.errors, 'audio', '')}
        />
      </Column>
      <Column lgSize={4}>
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
      <Column lgSize={12}>
        {props.showPostPhrase && (
        <TextInput
          label="Post Phrase"
          disabled={props.submitting}
          value={get(props.values, 'postPhrase', '')}
          onChange={value => props.onChange('postPhrase', value)}
          description={get(props.errors, 'postPhrase', '')}
          fieldValidation={get(props.errors, 'postPhrase', null) && 'error'}
        />
      )}
        {props.showPostPhrase && (
          <FileInput
            label="Upload the post phrase audio"
            accept="audio"
            value={get(props.values, 'postPhraseAudio', '')}
            onChange={(key) => props.onChange('postPhraseAudio', key)}
            errorText={get(props.errors, 'postPhraseAudio', '')}
            disabled={props.disabled}
          />
        )}
      </Column>
    </Row>
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
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default PresentationItemForm;
