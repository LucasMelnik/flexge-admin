import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { browserHistory} from 'react-router';
import qs from 'qs';

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
    this.filterForm.setInitialValues({
      from: moment().subtract(30, 'days'),
      to: moment(),
    });
  }

  init = action(() => {
    const params = qs.parse(window.location.search.substring(1));
    if (params.page) {
      this.pagination.current = parseInt(params.page);
    }

    this.messages = [];
    this.load(this.pagination);
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
          ...this.filterForm.getValue('memberId') && {
            member: this.filterForm.getValue('memberId'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.messages = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;

        const params = qs.parse(window.location.search.substring(1));
        params.page = this.pagination.current;
        browserHistory.replace(`${window.location.pathname}?${qs.stringify(params)}`);
      } else {
        this.messages = [];
      }
    });
  });
}

const sentMessageListService = new SentMessageListService();

export default sentMessageListService;
