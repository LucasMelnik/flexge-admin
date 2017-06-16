import React from 'react';
import PropTypes from 'prop-types';
import Translation from './Translation';

const TranslationContainer = props => (
  <Translation
    values={props.values}
    errors={props.errors}
    onChange={props.onChange}
    submitting={props.submitting}
  />
);

TranslationContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

TranslationContainer.defaultProps = {
  values: {},
  errors: {},
};

export default TranslationContainer;