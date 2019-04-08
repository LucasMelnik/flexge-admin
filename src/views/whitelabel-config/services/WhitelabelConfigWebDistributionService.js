import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

class WhitelabelConfigWebDistributionService {
  fetchCertificate = new FetchService();
  fetchDistribution = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      certificate: {},
      distributions: [],
      whitelabelConfigId: null,
    });
  }

  init = action((whitelabelConfigId) => {
    this.whitelabelConfigId = whitelabelConfigId;
    this.certificate = {};
    this.distributions = [];
    this.loadCertificate();
    this.loadDistributions();
  });

  loadCertificate = action(() => {
    this.fetchCertificate.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}/ssl`,
    }).then(() => {
      if (this.fetchCertificate.data) {
        this.certificate = this.fetchCertificate.data;
      } else {
        this.certificate = {};
      }
    });
  });

  loadDistributions = action(() => {
    this.fetchDistribution.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}`,
    }).then(() => {
      if (this.fetchDistribution.data) {
        this.distributions = ['ADMIN', 'STUDENT', 'KIDS'].map(appType => {
          const distribution = (this.fetchDistribution.data.cloudfrontDistributions || []).find(d => d.app === appType);
          if (distribution) {
            return distribution;
          }
          return {
            app: appType,
          };
        });
        console.log(this.distributions)
      } else {
        this.distributions = [];
      }
    });
  });

  createDistribution = action((distribution) => {
    this.fetchDistribution.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}/web-distributions`,
      method: 'post',
      body: {
        app: distribution.app,
      }
    }).then(() => {
      if (this.fetchDistribution.data) {
        this.loadDistributions();
        NotificationService.addNotification('Distribution created and it is deploying', 'success');
      } else {
        NotificationService.addNotification('Error to create Distribution', 'error');
      }
    });
  });

  disableDistribution = action((distribution) => {
    this.fetchDistribution.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}/web-distributions/${distribution.app}`,
      method: 'delete',
    }).then(() => {
      if (this.fetchDistribution.data) {
        this.loadDistributions();
        NotificationService.addNotification('Disabling the distribution', 'success');
      } else {
        NotificationService.addNotification('Error to disable Distribution', 'error');
      }
    });
  });
}

const whitelabelConfigWebDistributionService = new WhitelabelConfigWebDistributionService();
export default whitelabelConfigWebDistributionService;

