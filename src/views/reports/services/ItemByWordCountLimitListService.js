import { action, extendObservable } from 'mobx';
import pickBy from 'lodash/pickBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class ItemByWordCountLimitListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
    this.form.validations = {
      course: [isRequired],
      module: [],
      unit: [],
      wordCountThreshold: [isRequired],
    };
  }

  init = action(() => {
    this.items = [];
    this.pagination = {
      current: 1,
      total: 0,
      pageSize: 50,
    };
  });

  load = action((pagination) => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    if (pagination) {
      this.pagination.current = pagination.current;
    }

    this.fetch.fetch({
      url: `/reports/items-by-word-count`,
      query: {
        ...pickBy(this.form.getValues(), x => !!x),
        page: this.pagination.current,
        size: this.pagination.pageSize,
      },
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.items = [];
        this.pagination.total = 0;
      }
    });
  });

}

const itemByWordCountLimitListService = new ItemByWordCountLimitListService();

export default itemByWordCountLimitListService;
