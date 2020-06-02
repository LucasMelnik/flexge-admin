import { action, extendObservable } from 'mobx';
import pickBy from 'lodash/pickBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class PaymentListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      payments: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
  }

  init = action((studentId) => {
    this.payments = [];
    if (studentId) {
      this.form.setInitialValues({ student: studentId });
    } else {
      this.form.setInitialValues({});
    }
    this.load();
  });

  load = action((pagination, filters, sort) => {
    if (pagination) {
      this.pagination.current = pagination.current;
    } else {
      this.pagination.current = 1;
    }
    if (!sort) {
      sort = {
        field: 'createdAt',
        order: 'descend'
      }
    }

    this.fetch.fetch({
      url: '/payments',
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...sort && sort.field && {
          sort: {
            [sort.field]: sort.order === 'descend' ? 'desc' : 'asc'
          }
        },
        query: {
          ...pickBy(this.form.getValues(), x => !!x)
        }
      }
    }).then(() => {
      if (this.fetch.data) {
        this.payments = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.payments = [];
        this.pagination.total = 0;
      }
    });
  });
}

const paymentListService = new PaymentListService();

export default paymentListService;
