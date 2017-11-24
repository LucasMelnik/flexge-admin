import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CompanyDetailService {
  fetch = new FetchService();
  fetchDistributor = new FetchService();

  constructor() {
    extendObservable(this, {
      company: {},
      distributor: {},
    });
  }

  handleLoad = action((companyId) => {
    if (companyId) {
      this.fetch.fetch({
        url: `/companies/${companyId}`,
      }).then(() => {
        this.company = this.fetch.data;
      });
    }
  });

  handleLoadDistributor = action((distributorId) => {
    this.fetchDistributor.fetch({
      url: `/distributors/${distributorId}`,
    }).then(() => {
      this.distributor = this.fetchDistributor.data;
    });
  });

}

const companyDetailService = new CompanyDetailService();

export default companyDetailService;
