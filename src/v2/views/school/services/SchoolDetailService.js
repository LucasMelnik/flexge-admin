import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class SchoolDetailService {
  fetchSchool = new FetchService();
  fetchDistributor = new FetchService();
  fetchCompany = new FetchService();

  constructor() {
    extendObservable(this, {
      school: null,
      company: null,
      distributor: null,
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

const schoolDetailService = new SchoolDetailService();

export default schoolDetailService;
