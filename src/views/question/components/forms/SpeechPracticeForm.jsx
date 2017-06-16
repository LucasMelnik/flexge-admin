import React from 'react';
import PropTypes from 'prop-types';
import TranslationContainer from '../inputs/TranslationContainer';

const SpeechPracticeForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

SpeechPracticeForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

SpeechPracticeForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default SpeechPracticeForm;