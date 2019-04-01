import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class WhitelabelConfigListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      configs: [],
    });
  }

  init = action(() => {
    this.configs = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/whitelabel-configs',
    }).then(() => {
      if (this.fetch.data) {
        this.configs = this.fetch.data;
      } else {
        this.configs = [];
      }
    });
  });

  handleRemove = action((whitelabelConfig) => {
    ConfirmationDialogService.show(
      'Delete Whitelabel Configuration',
      `You are about to delete the Configuration for "${whitelabelConfig.domain}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/whitelabel-configs/${whitelabelConfig.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Whitelabel configuration "${whitelabelConfig.domain}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const whitelabelConfigListService = new WhitelabelConfigListService();

export default whitelabelConfigListService;
