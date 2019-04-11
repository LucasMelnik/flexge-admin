import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import { browserHistory } from 'react-router';

class WhitelabelConfigMobileDistributionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      isOpen: false,
      whitelabelConfigId: null,
    });
  }

  init = action((whitelabelConfigId) => {
    this.whitelabelConfigId = whitelabelConfigId;
    this.fetch.fetch({
      url: `/whitelabel-configs/${this.whitelabelConfigId}`,
    });
  });

  showForm = action((appType) => {
    const distribution = (this.fetch.data.appDistributions || []).find(x => x.app === appType);
    if (distribution) {
      this.form.setInitialValues({ ...distribution });
    } else {
      this.form.validations = {
        logoFile: [isRequired],
        iosIconFile: [isRequired],
        androidIconFile: [isRequired],
      };
      this.form.setInitialValues({ app: appType });
    }
    this.isOpen = true;
  });

  closeForm = action(() => {
    this.isOpen = false;
    this.form.setInitialValues({});
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const formValues = this.form.getValues();

    const formData = new FormData();
    formData.append('app', formValues.app);
    if (formValues.logoFile) {
      formData.append('logoFile',formValues.logoFile);
    }
    if (formValues.iosIconFile) {
      formData.append('iosIconFile', formValues.iosIconFile);
    }
    if (formValues.androidIconFile) {
      formData.append('androidIconFile', formValues.androidIconFile);
    }
    if (formValues.androidIconBackgroundFile) {
      formData.append('androidIconBackgroundFile', formValues.androidIconBackgroundFile);
    }
    if (formValues.androidIconLogoFile) {
      formData.append('androidIconLogoFile', formValues.androidIconLogoFile);
    }
    if (formValues.iosStoreUrl) {
      formData.append('iosStoreUrl', formValues.iosStoreUrl);
    }
    if (formValues.androidStoreUrl) {
      formData.append('androidStoreUrl', formValues.androidStoreUrl);
    }

    this.submit.fetch({
      method: formValues.id ? 'put' : 'post',
      url: formValues.id ? `/whitelabel-configs/${this.whitelabelConfigId}/mobile-distributions/${this.form.getValue('app')}` : `/whitelabel-configs/${this.whitelabelConfigId}/mobile-distributions`,
      body: formData,
    }).then(() => {
      if (this.submit.data) {
        browserHistory.push(`/whitelabel-configs/${this.submit.data.id}`);
        NotificationService.addNotification('Mobile distribution config saved', 'success');
        this.isOpen = false;
      }
      if (this.submit.error) {
        NotificationService.addNotification('Error to save mobile distribution config', 'error');
      }
    });
  });
}

const whitelabelConfigMobileDistributionFormService = new WhitelabelConfigMobileDistributionFormService();
export default whitelabelConfigMobileDistributionFormService;

