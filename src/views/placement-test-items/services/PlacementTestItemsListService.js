import numeral from 'numeral';
import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

class PlacementTestItemsListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/placement-test-stats',
    }).then(() => {
      if (this.fetch.data) {
        const items = orderBy(this.fetch.data, ['placementTestLevel.level', 'order'], ['asc', 'asc']);
        this.items = items.map(item => ({
          ...item,
          errorPercentage: !item.errorPercentage ? 'N/A' : numeral(item.errorPercentage).format('0.00%'),
        }));
      } else {
        this.items = [];
      }
    });
  });
}

const placementTestItemsListService = new PlacementTestItemsListService();

export default placementTestItemsListService;
