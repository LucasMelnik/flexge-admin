import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class GrammarListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      grammars: [],
      filter: '',
    });
  }

  init = action(() => {
    this.grammars = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/grammars',
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
        this.grammars = this.fetch.data;
      } else {
        this.grammars = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((grammar) => {
    ConfirmationDialogService.show(
      'Delete Grammar',
      `You are about to delete the Grammar "${grammar.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/grammars/${grammar.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Grammar "${grammar.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const grammarListService = new GrammarListService();

export default grammarListService;
