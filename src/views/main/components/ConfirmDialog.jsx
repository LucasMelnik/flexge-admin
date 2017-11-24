import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../core/form/Button';
import Dialog from '../../../core/layout/Dialog';

const ConfirmDialog = props => (
  <Dialog
    title={props.title}
    actions={[
      <Button
        key="confirmButton"
        type="danger"
        label={props.confirmLabel}
        onClick={() => props.onConfirm()}
      />,
      <Button
        key="discardButton"
        type="default"
        label={props.discardLabel}
        onClick={() => props.onDiscard()}
      />,
    ]}
    isOpen={props.isOpen}
  >
    {props.message}
  </Dialog>
);

ConfirmDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  discardLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

export default ConfirmDialog;
