import React from 'react';
import PropTypes from 'prop-types';
import TranslationContainer from '../inputs/TranslationContainer';

const AnsweringQuestionForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

export default AnsweringQuestionForm;