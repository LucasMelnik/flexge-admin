import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class FunctionOfLanguageListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      functions: [],
      filter: '',
    });
  }

  init = action(() => {
    this.functions = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/functions-of-language',
      query: {
        ...this.filter && {
          query: {
            name: {
              $regex: this.filter,
              $options: 'i',
            },
          },
        }
      },
    }).then(() => {
      if (this.fetch.data) {
        this.functions = this.fetch.data;
      } else {
        this.functions = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((functionOfLanguage) => {
    ConfirmationDialogService.show(
      'Delete Function Of Language',
      `You are about to delete the Grammar "${functionOfLanguage.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/functions-of-language/${functionOfLanguage.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Function Of Language "${functionOfLanguage.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const functionOfLanguageListService = new FunctionOfLanguageListService();

export default functionOfLanguageListService;
