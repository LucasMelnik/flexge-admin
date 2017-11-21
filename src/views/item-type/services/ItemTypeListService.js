import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class ItemTypeListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      filter: '',
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/item-types',
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
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((itemType) => {
    ConfirmationDialogService.show(
      'Delete Item Type',
      `You are about to delete the Item Type "${itemType.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/item-types/${itemType.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification(`Item Type "${itemType.name}" deleted successfully.`, 'success');
          this.load();
        });
      });
  });
}

const itemTypeListService = new ItemTypeListService();

export default itemTypeListService;
