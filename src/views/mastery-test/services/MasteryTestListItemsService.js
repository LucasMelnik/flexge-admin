import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class MasteryTestListItemsService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  handleLoad = action((masteryTestId) => {
    this.fetch.fetch({
      url: `/mastery-tests/${masteryTestId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });
}

const masteryTestListItemsService = new MasteryTestListItemsService();

export default masteryTestListItemsService;
