import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class CompanyListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companies: [],
      filter: '',
    });
  }

  init = action(() => {
    this.load();
  });

  loadCompaniesByDistributorId = action((distributorId) => {
    this.fetch.fetch({
      url: '/companies',
      query: {
        query: {
          // distributor: distributorId,
        }
      },
    }).then(() => {
      if (this.fetch.data) {
        this.companies = this.fetch.data;
      } else {
        this.companies = [];
      }
    });
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/companies',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.companies = this.fetch.data;
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
          window.showSuccess(`Company "${company.name}" deleted successfully.`);
          this.load();
        });
      });
  });
}

const companyListService = new CompanyListService();

export default companyListService;
