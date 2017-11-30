import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class RegionListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      regions: [],
      filter: '',
    });
  }

  init = action(() => {
    this.regions = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/regions',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.regions = this.fetch.data;
      } else {
        this.regions = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((region) => {
    ConfirmationDialogService.show(
      'Delete Region',
      `You are about to delete the Region "${region.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/regions/${region.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Region "${region.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const regionListService = new RegionListService();

export default regionListService;
