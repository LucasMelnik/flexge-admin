import React from 'react';
import PropTypes from 'prop-types';
import TranslationContainer from '../inputs/TranslationContainer';

const PronunciationForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

PronunciationForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

PronunciationForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default PronunciationForm;