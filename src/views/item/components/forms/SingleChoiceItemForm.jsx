import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../../core/layout/Separator';
import AnswersInputContainer from '../inputs/AnswersInputContainer';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TextInput from '../../../../core/form/TextInput';
import FileInput from '../../../../core/form/FileInput';
import Audios from '../inputs/Audios';
import Column from '../../../../core/layout/Column';
import Row from '../../../../core/layout/Row';

const SingleChoiceItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <Row>
      <Column size={4}>
        <Audios
          audioPath="audio"
          generatedAudioPath="generatedAudio"
          values={props.values}
          submitting={props.submitting}
          disabled={props.disabled}
          onChange={props.onChange}
          errors={props.errors}
        />
      </Column>
      {props.hasImage && (
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
      )}
    </Row>
    <Separator size="xs" />
    {(props.showPostPhrase && !props.isTestItem) && (
      <TextInput
        label="Post Phrase"
        disabled={props.submitting}
        value={get(props.values, 'postPhrase', '')}
        onChange={value => props.onChange('postPhrase', value)}
        description={get(props.errors, 'postPhrase', '')}
        fieldValidation={get(props.errors, 'postPhrase', null) && 'error'}
      />
    )}
    {(props.showPostPhrase && !props.isTestItem) && (
      <Audios
        audioPath="postPhraseAudio"
        generatedAudioPath="generatedPostPhraseAudio"
        values={props.values}
        disabled={props.disabled}
        onChange={props.onChange}
        errors={props.errors}
      />
    )}
    <AnswersInputContainer
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      type={props.type}
      disabled={props.disabled}
    />
  </div>
);

SingleChoiceItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
  type: PropTypes.oneOf([
    'SINGLE_CHOICE_TEXT',
    'SINGLE_CHOICE_AUDIO',
    'SINGLE_CHOICE_IMAGE',
  ]).isRequired,
  showPostPhrase: PropTypes.bool,
  hasImage: PropTypes.bool,
};

SingleChoiceItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  showPostPhrase: false,
  isTestItem: false,
  hasImage: false,
};

export default SingleChoiceItemForm;
