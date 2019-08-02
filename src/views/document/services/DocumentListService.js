import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class DocumentListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      documents: [],
    });
  }

  init = action(() => {
    this.documents = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/documents',
    }).then(() => {
      if (this.fetch.data) {
        this.documents = this.fetch.data;
      } else {
        this.documents = [];
      }
    });
  });

  handleRemove = action((document) => {
    ConfirmationDialogService.show(
      'Delete Document',
      `You are about to delete the Document "${document.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/documents/${document.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Document "${document.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const documentListService = new DocumentListService();

export default documentListService;
