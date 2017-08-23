import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class CompanyListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      companies: [],
      filteredCompanies: [],
      users: [],
      filter: '',
    });
  }

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
        this.filteredCompanies = this.fetch.data;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    console.log(value, 'filter')
    // this.load();
    this.companies = this.filteredCompanies.filter(company =>
      company.name.toLowerCase().search(value) !== -1);

      console.log(this.companies)
  });

  handleRemove = action((manager) => {
    ConfirmationDialogService.show(
      'Delete Manager',
      `You are about to delete the manager "${manager.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `${this.url}/${manager.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const companyListService = new CompanyListService();

export default companyListService;
