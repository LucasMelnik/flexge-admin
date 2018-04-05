import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class UnReadMessageCountService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      total: 0,
    });
  }

  init = action(() => {
    this.total = 0;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/received-messages/count-unread',
    }).then(() => {
      if (this.fetch.data) {
        this.total = this.fetch.data.total;
      } else {
        this.total = 0;
      }
    });
  });
}

const unReadMessageCountService = new UnReadMessageCountService();

export default unReadMessageCountService;
