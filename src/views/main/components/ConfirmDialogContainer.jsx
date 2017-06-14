import React from 'react';
import { observer } from 'mobx-react';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import ConfirmDialog from './ConfirmDialog';

const ConfirmDialogContainer = () => (
  <ConfirmDialog
    isOpen={ConfirmationDialogService.isOpen}
    title={ConfirmationDialogService.title}
    message={ConfirmationDialogService.message}
    confirmLabel={ConfirmationDialogService.confirmLabel}
    discardLabel={ConfirmationDialogService.discardLabel}
    onConfirm={ConfirmationDialogService.onConfirm}
    onDiscard={ConfirmationDialogService.onDiscard}
  />
);

export default observer(ConfirmDialogContainer);
