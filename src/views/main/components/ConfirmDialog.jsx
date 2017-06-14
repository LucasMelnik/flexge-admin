import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Button from '../../../core/form/Button';

const ConfirmDialog = props => (
  <Dialog
    title={props.title}
    actions={[
      <Button
        secondary
        raised={false}
        label={props.confirmLabel}
        onClick={() => props.onConfirm()}
      />,
      <Button
        raised={false}
        label={props.discardLabel}
        onClick={() => props.onDiscard()}
      />
    ]}
    modal={true}
    open={props.isOpen}
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
