
import { extendObservable, action } from 'mobx';

class ConfirmationDialogService {

  constructor() {
    extendObservable(this, {
      isOpen: false,
      confirmLabel: 'Yes',
      discardLabel: 'No',
      message: '',
      title: '',
      onConfirm: () => {
        this.isOpen = false;
        this.callback();
      },
      onDiscard: () => {
        this.isOpen = false;
      },
      callback: null,
    });
  }

  show = action((title, message, callback, confirmLabel, discardLabel) => {
    this.title = title;
    this.message = message;
    this.callback = callback;

    if (confirmLabel) {
      this.confirmLabel = confirmLabel;
    }

    if (discardLabel) {
      this.discardLabel = discardLabel;
    }

    this.isOpen = true;
  });
}

const confirmationDialogService = new ConfirmationDialogService();
export default confirmationDialogService;
