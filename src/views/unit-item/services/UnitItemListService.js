import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UnitItemListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      total: 0,
      page: 1,
      rowsByPage: 10,
      pageCount: 1,
      unitId: null,
      selectCallback: null,
    });
  }

  init = action((unitId, selectCallback) => {
    this.unitId = unitId;
    this.selectCallback = selectCallback;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/units/${this.unitId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data.docs;
        this.total = this.fetch.data.total;
        this.limit = this.fetch.data.limit;
        this.pageCount = this.fetch.data.pages;
      } else {
        this.items = [];
        this.total = 0;
        this.pageCount = 1;
      }
    });
  });

  handleOrderChange = action((unitItem, order)=> {
    this.fetch.fetch({
      url: `/units/${unitItem.unit}/items/${unitItem.item.id}/unit-item/${unitItem.id}`,
      method: 'put',
      body: {
        order,
      }
    }).then(() => {
      this.load();
    });
  });

  handleSelect = action((item)=> {
    if (this.selectCallback) {
      this.selectCallback(item);
    }
  });

  handleUnlinkItem = action((unitItem) => {
    ConfirmationDialogService.show(
      'Delete Item',
      `You are about to delete the item "${unitItem.item.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/units/${this.unitId}/items/${unitItem.item.id}/unit-item/${unitItem.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const unitItemListService = new UnitItemListService();

export default unitItemListService;
