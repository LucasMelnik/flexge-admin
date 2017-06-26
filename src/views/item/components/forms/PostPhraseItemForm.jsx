import React from 'react';
import PropTypes from 'prop-types';
import TranslationInputContainer from '../inputs/TranslationInputContainer';

const PostPhraseItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

PostPhraseItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

PostPhraseItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default PostPhraseItemForm;
