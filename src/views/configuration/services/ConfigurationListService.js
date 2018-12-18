import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class ConfigurationListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      configurations: [],
      filter: '',
    });
  }

  init = action(() => {
    this.configurations = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/configurations',
      query: {
        include: 'academicPlans',
      },
    }).then(() => {
      if (this.fetch.data) {
        this.configurations = this.fetch.data;
      } else {
        this.configurations = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((configuration) => {
    ConfirmationDialogService.show(
      'Delete Configuration',
      'You are about to delete the Configuration, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/configurations/${configuration.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('Configuration deleted successfully.', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const configurationListService = new ConfigurationListService();

export default configurationListService;
