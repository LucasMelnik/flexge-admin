import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';

class PracticeTestListItemsService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      practiceTestId: null,
    });
  }

  init = action((practiceTestId) => {
    this.practiceTestId = practiceTestId;
    this.handleLoad();
  });

  handleLoad = action(() => {
    this.fetch.fetch({
      url: '/practice-test-items',
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, ['order'], ['asc']);
      } else {
        this.items = [];
      }
    });
  });

  handleOrderChange = action((practiceTestId, itemId, order) => {
    this.submit.fetch({
      url: `/practice-test-items/${practiceTestId}/items/${itemId}`,
      method: 'put',
      body: {
        order,
      },
    }).then(() => {
      this.handleLoad();
    });
  });
}

const practiceTestListItemsService = new PracticeTestListItemsService();

export default practiceTestListItemsService;
