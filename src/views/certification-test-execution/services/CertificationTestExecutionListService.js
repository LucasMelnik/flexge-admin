import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class CertificationTestExecutionListService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      certificationTests: [],
      filter: '',
      status: null,
    });
  }

  init = action((status) => {
    this.certificationTests = [];
    this.filter = '';
    this.status = status;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/certification-test',
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
        if (this.status === 'PENDING') {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => !certificationTest.scheduledFor);
        } else if (this.status === 'SCHEDULED') {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => certificationTest.scheduledFor
              && !certificationTest.completedAt);
        } else if (this.status === 'PENDING_REVIEW') {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => certificationTest.completedAt
              && !certificationTest.approvedAt
              && !certificationTest.failedAt);
        } else {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => certificationTest.approvedAt || certificationTest.failedAt);
        }
      } else {
        this.certificationTests = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });
}
