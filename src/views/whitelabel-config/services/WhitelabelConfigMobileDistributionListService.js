import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

class WhitelabelConfigMobileDistributionListService {
  fetchDistribution = new FetchService();
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      distributions: [],
      whitelabelConfigId: null,
    });
  }

  init = action((whitelabelConfigId) => {
    this.whitelabelConfigId = whitelabelConfigId;
    this.distributions = [];
    this.loadDistributions();
  });

  loadDistributions = action(() => {
    this.fetchDistribution.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}`,
    }).then(() => {
      if (this.fetchDistribution.data) {
        this.distributions = ['STUDENT_MOBILE', 'PARENTS_MOBILE'].map(appType => {
          const distribution = (this.fetchDistribution.data.appDistributions || []).find(d => d.app === appType);
          if (distribution) {
            return distribution;
          }
          return {
            app: appType,
          };
        });
      } else {
        this.distributions = [];
      }
    });
  });

  handleRemove = action((distribution) => {
    this.fetchDistribution.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}/mobile-distributions/${distribution.app}`,
      method: 'delete',
    }).then(() => {
      if (this.fetchDistribution.data) {
        this.loadDistributions();
        NotificationService.addNotification('Distribution removed', 'success');
      } else {
        NotificationService.addNotification('Error to removeDistribution', 'error');
      }
    });
  });
}

const whitelabelConfigMobileDistributionListService = new WhitelabelConfigMobileDistributionListService();
export default whitelabelConfigMobileDistributionListService;

