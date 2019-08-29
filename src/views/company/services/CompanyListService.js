import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CompanyListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      distributorId: null,
      companies: [],
      filter: '',
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
  }

  init = action((distributorId) => {
    this.companies = [];
    this.filter = '';
    this.distributorId = distributorId;
    this.load();
  });

  load = action((pagination, filters, sort) => {
    if (pagination) {
      this.pagination.current = pagination.current;
    }

    this.fetch.fetch({
      url: '/companies',
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...sort && sort.field && {
          sort: {
            [sort.field]: sort.order === 'descend' ? 'desc' : 'asc'
          }
        },
        query: {
          ...this.filter && {
            name: {
              $regex: this.filter,
              $options: 'i',
            },
          },
          ...this.distributorId && {
            distributor: this.distributorId,
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.companies = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.companies = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((company) => {
    ConfirmationDialogService.show(
      'Delete Company',
      `You are about to delete the company "${company.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/companies/${company.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Company "${company.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const companyListService = new CompanyListService();

export default companyListService;
