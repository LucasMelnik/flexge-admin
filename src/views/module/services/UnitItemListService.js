import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UnitItemListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      unitId: null,
    });
  }

  init = action((unitId) => {
    this.unitId = unitId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/units/${this.unitId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['order'], ['asc']);
      } else {
        this.items = [];
        this.total = 0;
        this.pageCount = 1;
      }
    });
  });

  handleOrderChange = action((unitItem, order) => {
    this.submit.fetch({
      url: `/units/${unitItem.unit}/items/${unitItem.item.id}/unit-item/${unitItem.id}`,
      method: 'put',
      body: {
        order,
      }
    }).then(() => {
      this.load();
    });
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
