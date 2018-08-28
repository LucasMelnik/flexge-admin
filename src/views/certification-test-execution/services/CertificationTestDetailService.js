import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';

class CertificationTestDetailService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      certificationTest: {},
    });
  }

  handleLoad = action((certificationTestId) => {
    if (certificationTestId) {
      this.fetch.fetch({
        url: `/certification-test/${certificationTestId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.certificationTest = this.fetch.data;
        }
      });
    }
  });
}

const certificationTestDetailService = new CertificationTestDetailService();

export default certificationTestDetailService;
