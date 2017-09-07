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
      icon="fa fa-ban"
      fullWidth
      disabled={props.isDisabled}
      onClick={props.onReset}
      label="Discard changes"
    />
    &emsp;
    <Button
      icon="fa fa-check"
      type="primary"
      fullWidth
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