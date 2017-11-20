import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const FormButtons = props => (
  <div
    style={{
      textAlign: 'right',
      marginBottom: 20,
    }}
  >
    <Button
      icon="reload"
      disabled={props.isDisabled}
      onClick={props.onReset}
      label="Discard changes"
    />
    &emsp;
    <Button
      icon="check"
      type="primary"
      disabled={props.isDisabled}
      buttonType="submit"
      label={props.confirmLabel}
    />
  </div>
);

FormButtons.propTypes = {
  confirmLabel: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default FormButtons;
