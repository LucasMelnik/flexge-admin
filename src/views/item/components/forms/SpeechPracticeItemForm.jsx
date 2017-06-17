import React from 'react';
import PropTypes from 'prop-types';
import TranslationInputContainer from '../inputs/TranslationInputContainer';

const SpeechPracticeItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

SpeechPracticeItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

SpeechPracticeItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default SpeechPracticeItemForm;