import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

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
    this.items = [];
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
      },
    }).then(() => {
      this.load();
    });
  });

  handleAutoReorder = action((startIndex, sortAction) => {
    this.reorderSubmitting = true;

    const reorderPromises = [];
    this.items.forEach((unitItem, index) => {
      const body = {
        group: unitItem.group,
        order: unitItem.order,
      };

      if (sortAction === 'ADD_LINE' && index >= startIndex) {
        body.order = unitItem.order + 1;
      } else if (sortAction === 'REMOVE_LINE' && index >= startIndex) {
        body.order = unitItem.order - 1;
      }

      reorderPromises.push(
        this.submit.fetch({
          url: `/units/${unitItem.unit}/items/${unitItem.item.id}`,
          method: 'put',
          body,
        }),
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
          NotificationService.addNotification('Item deleted', 'success');
          this.load();
        });
      });
  });
}

const unitItemListService = new UnitItemListService();

export default unitItemListService;
