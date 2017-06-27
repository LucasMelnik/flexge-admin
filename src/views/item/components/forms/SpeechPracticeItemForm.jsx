import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import FileInput from '../../../../core/form/FileInput';
import Separator from '../../../../core/layout/Separator';

const SpeechPracticeItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
    />
    <Separator size="xs" />
    <FileInput
      accept="audio"
      value={get(props.values, 'audio', '')}
      onChange={(key) => props.onChange('audio', key)}
      errorText={get(props.errors, 'audio', '')}
    />
  </div>
);

SpeechPracticeItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

SpeechPracticeItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
};

export default SpeechPracticeItemForm;
