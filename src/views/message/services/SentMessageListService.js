import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class SentMessageListService {
  fetch = new FetchService();
  filterForm = new FormService();

  constructor() {
    extendObservable(this, {
      messages: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
      },
    });
    this.filterForm.setInitialValues({});
  }

  init = action(() => {
    this.messages = [];
    this.load();
  });

  load = action((page) => {
    if (page && page.current) {
      this.pagination.current = page.current;
    } else {
      this.pagination.current = 1;
    }

    this.fetch.fetch({
      url: '/sent-messages',
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        query: {
          ...this.filterForm.getValue('from') && {
            from: this.filterForm.getValue('from').toDate(),
          },
          ...this.filterForm.getValue('to') && {
            to: this.filterForm.getValue('to').toDate(),
          },
          ...this.filterForm.getValue('subject') && {
            subject: this.filterForm.getValue('subject'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.messages = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.messages = [];
      }
    });
  });
}

const sentMessageListService = new SentMessageListService();

export default sentMessageListService;
