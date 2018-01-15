import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../../core/layout/Separator';
import AnswersInputContainer from '../inputs/AnswersInputContainer';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TextInput from '../../../../core/form/TextInput';
import FileInput from '../../../../core/form/FileInput';
import Audios from '../inputs/Audios';

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
    <Audios values={props.values} />
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
      <FileInput
        label="Upload the post phrase audio"
        accept="audio"
        value={get(props.values, 'postPhraseAudio', '')}
        onChange={(key) => props.onChange('postPhraseAudio', key)}
        errorText={get(props.errors, 'postPhraseAudio', '')}
        disabled={props.disabled}
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
};

SingleChoiceItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  showPostPhrase: false,
  isTestItem: false,
};

export default SingleChoiceItemForm;
