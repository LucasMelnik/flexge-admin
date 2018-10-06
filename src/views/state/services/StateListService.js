import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class StateListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      states: [],
      filter: '',
    });
  }

  init = action(() => {
    this.states = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/states',
      query: {
        ...this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.states = this.fetch.data;
      } else {
        this.states = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((state) => {
    ConfirmationDialogService.show(
      'Delete State',
      `You are about to delete the State "${state.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/states/${state.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`State "${state.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const stateListService = new StateListService();

export default stateListService;
