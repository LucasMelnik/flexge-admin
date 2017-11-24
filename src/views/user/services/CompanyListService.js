import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CompanyListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      allCompanies: [],
      filteredCompanies: [],
      filter: '',
    });
  }

  load = action(() => {
    this.fetch.fetch({
      url: '/companies',
    }).then(() => {
      if (this.fetch.data) {
        this.allCompanies = this.fetch.data;
        this.filteredCompanies = this.fetch.data;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.filteredCompanies = this.allCompanies
      .filter(company => company.name.toLowerCase().search(value) !== -1);
  });
}

const companyListService = new CompanyListService();

export default companyListService;
