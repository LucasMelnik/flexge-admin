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
      reorderSubmitting: false,
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
        this.items = orderBy(this.fetch.data, ['order', 'group'], ['asc',  'asc']);
        this.reorderSubmitting = false;
      } else {
        this.items = [];
        this.total = 0;
        this.pageCount = 1;
      }
    });
  });

  handleOrderOrGroupChange = action((unitItem, order, group) => {
    this.submit.fetch({
      url: `/units/${unitItem.unit}/items/${unitItem.item.id}`,
      method: 'put',
      body: {
        order,
        group,
      }
    }).then(() => {
      this.load();
    });
  });

  handleAutoReorder = action((startIndex, action) => {
    this.reorderSubmitting = true;

    const reorderPromises = [];
    this.items.forEach((unitItem, index) => {
      const body = {
        group: unitItem.group,
      };

      if (action === 'ADD_LINE' && index >= startIndex) {
        body.order = unitItem.order + 1;
      } else if (action === 'REMOVE_LINE' && index <= startIndex) {
        body.order = unitItem.order - 1;
      }

      reorderPromises.push(
        this.submit.fetch({
          url: `/units/${unitItem.unit}/items/${unitItem.item.id}`,
          method: 'put',
          body,
        })
      );
    });

    Promise.all(reorderPromises)
      .then(() => this.load());
  });

  handleUnlinkItem = action((unitItem) => {
    ConfirmationDialogService.show(
      'Delete Item',
      `You are about to delete the item "${unitItem.item.text}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/units/${this.unitId}/items/${unitItem.item.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const unitItemListService = new UnitItemListService();

export default unitItemListService;
