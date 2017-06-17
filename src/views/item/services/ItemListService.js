import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class ItemListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      selectCallback : null,
      url: '/items',
    });
  }

  init = action((url, selectCallback) => {
    this.url = url;
    this.selectCallback = selectCallback;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: this.url,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });

  handleSelect = action((item)=> {
    if (this.selectCallback) {
      this.selectCallback(item);
    } else {
      browserHistory.push(`/item/${item.id}`);
    }
  });

  handleRemove = action((item) => {
    ConfirmationDialogService.show(
      'Delete Item',
      `You are about to delete the item "${item.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `${this.url}/${item.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const itemListService = new ItemListService();

export default itemListService;
