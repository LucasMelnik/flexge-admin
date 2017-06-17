import React from 'react';
import PropTypes from 'prop-types';

const TextItemForm = props => (
  <div>
    todo add text area
  </div>
);

TextItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

TextItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default TextItemForm;