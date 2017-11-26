import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class PlacementTestItemListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      placementTestId: null,
    });
  }

  init = action((placementTestId) => {
    this.items = [];
    this.placementTestId = placementTestId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/grammar-placement-test-levels/${this.placementTestId}/items`,
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

  handleOrderChange = action((placementTestItem, order) => {
    this.submit.fetch({
      url: `/grammar-placement-test-levels/${placementTestItem.grammarPlacementTestLevel}/items/${placementTestItem.item.id}`,
      method: 'put',
      body: {
        order,
      },
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
          url: `/grammar-placement-test-levels/${this.placementTestId}/items/${unitItem.item.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Item deleted', 'success');
          this.load();
        });
      });
  });
}

const placementTestItemListService = new PlacementTestItemListService();

export default placementTestItemListService;
