import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

class MasteryTestListItemsService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      masteryTestId: null,
    });
  }

  init = action((masteryTestId) => {
    this.masteryTestId = masteryTestId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.fetch.fetch({
      url: `/mastery-tests/${this.masteryTestId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['order'], ['asc']);
      } else {
        this.items = [];
      }
    });
  });

  handleOrderChange = action((itemId, order) => {
    this.submit.fetch({
      url: `/mastery-tests/${this.masteryTestId}/items/${itemId}`,
      method: 'put',
      body: {
        order,
      }
    }).then(() => {
      this.handleLoad();
    });
  });
}

const masteryTestListItemsService = new MasteryTestListItemsService();

export default masteryTestListItemsService;
