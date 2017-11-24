import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class SchoolDetailService {
  fetchSchool = new FetchService();
  fetchDistributor = new FetchService();
  fetchCompany = new FetchService();

  constructor() {
    extendObservable(this, {
      school: {},
      company: {},
      distributor: {},
    });
  }

  handleLoadSchool = action((schoolId) => {
    this.fetchSchool.fetch({
      url: `/schools/${schoolId}`,
    }).then(() => {
      this.school = this.fetchSchool.data;
    });
  });

  handleLoadCompany = action((companyId) => {
    this.fetchCompany.fetch({
      url: `/companies/${companyId}`,
    }).then(() => {
      this.company = this.fetchCompany.data;
    });
  });

  handleLoadDistributor = action((distributorId) => {
    this.fetchDistributor.fetch({
      url: `/distributors/${distributorId}`,
    }).then(() => {
      this.distributor = this.fetchDistributor.data;
    });
  });
}
