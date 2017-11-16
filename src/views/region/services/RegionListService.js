import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class RegionListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      regions: [],
      filter: '',
    });
  }

  init = action(() => {
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
          window.showSuccess(`Region "${region.name}" deleted successfully.`);
          this.load();
        });
      });
  });
}

const regionListService = new RegionListService();

export default regionListService;