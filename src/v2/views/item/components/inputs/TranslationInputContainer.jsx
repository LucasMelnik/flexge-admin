import React from 'react';
import PropTypes from 'prop-types';
import TranslationInput from './TranslationInput';

const TranslationInputContainer = props => (
  <TranslationInput
    values={props.values}
    errors={props.errors}
    onChange={props.onChange}
    submitting={props.submitting}
    disabled={props.disabled}
    isTestItem={props.isTestItem}
  />
);

TranslationInputContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

TranslationInputContainer.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  isTestItem: false,
};

export default TranslationInputContainer;
