import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

class WhitelabelConfigCertificateService {
  fetch = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      certificate: {},
      whitelabelConfigId: null,
    });
  }

  init = action((whitelabelConfigId) => {
    this.whitelabelConfigId = whitelabelConfigId;
    this.certificate = {};
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}/ssl`,
    }).then(() => {
      if (this.fetch.data) {
        this.certificate = this.fetch.data;
      } else {
        this.certificate = {};
      }
    });
  });

  applyCertificate = action(() => {
    this.submit.fetch({
      method: 'put',
      url: `/whitelabel-configs/${this.whitelabelConfigId}/apply-certificate`,
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(`Whitelabel domains successfully configured.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error to apply whitelabel domains.`, 'error');
      }
    });
  });
}

const whitelabelConfigCertificateService = new WhitelabelConfigCertificateService();
export default whitelabelConfigCertificateService;

