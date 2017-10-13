import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class ItemAudioListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
      },
    });
  }

  init = action(() => {
    this.load();
  });

  load = action((page) => {
    if (page && page.current) {
      this.pagination.current = page.current;
    }

    this.fetch.fetch({
      url: `/reports/item-audios?page=${this.pagination.current}`,
    }).then(() => {
      if (this.fetch.data) {
        this.pagination.total = this.fetch.data.total;
        this.items = this.fetch.data.docs;
      } else {
        this.items = [];
        this.pagination = {
          current: 1,
          total: 0,
          pageSize: 15,
        };
      }
    });
  });

}

const itemAudioListService = new ItemAudioListService();

export default itemAudioListService;
