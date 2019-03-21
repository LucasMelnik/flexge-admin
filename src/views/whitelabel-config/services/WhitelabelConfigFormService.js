import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { browserHistory } from 'react-router';

export default class WhitelabelConfigFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      whitelabelConfigId: null,
    });
    this.form.validations = {
      domain: [isRequired],
      title: [isRequired],
      primaryColor: [isRequired],
      secondaryColor: [isRequired],
      lightColor: [isRequired],
      logo: [isRequired],
    };
  }

  handleLoad = action((whitelabelConfigId) => {
    this.form.reset();
    if (whitelabelConfigId) {
      this.fetch.fetch({
        url: `/whitelabel-configs/${whitelabelConfigId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({ ...this.fetch.data });
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.whitelabelConfigId = whitelabelConfigId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const whitelabelConfigId = this.form.getValue('id');

    const formData = new FormData();
    formData.append('domain', this.form.getValue('domain'));
    formData.append('title', this.form.getValue('title'));
    formData.append('primaryColor', this.form.getValue('primaryColor'));
    formData.append('secondaryColor', this.form.getValue('secondaryColor'));
    formData.append('lightColor', this.form.getValue('lightColor'));
    if (this.form.getValue('logo')) {
      formData.append('logoFile', this.form.getValue('logo'));
    }
    if (this.form.getValue('favicon')) {
      formData.append('favIconFile', this.form.getValue('favicon'));
    }
    if (this.form.getValue('iosIcon')) {
      formData.append('iosIconFile', this.form.getValue('iosIcon'));
    }
    if (this.form.getValue('androidIcon')) {
      formData.append('androidIconFile', this.form.getValue('androidIcon'));
    }
    if (this.form.getValue('mobileSplashScreen')) {
      formData.append('mobileSplashScreenFile', this.form.getValue('mobileSplashScreen'));
    }
    if (this.form.getValue('distributor')) {
      formData.append('distributor', this.form.getValue('distributor'));
    }
    if (this.form.getValue('company')) {
      formData.append('company', this.form.getValue('company'));
    }

    this.submit.fetch({
      method: whitelabelConfigId ? 'put' : 'post',
      url: whitelabelConfigId ? `/whitelabel-configs/${whitelabelConfigId}` : '/whitelabel-configs',
      body: formData,
    }).then(() => {
      if (this.submit.data) {
        browserHistory.push(`/whitelabel-configs/${this.submit.data}`);
        NotificationService.addNotification(`Whitelabel configuration ${whitelabelConfigId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${whitelabelConfigId ? 'updating' : 'creating'} whitelabel configuration.`, 'error');
      }
    });
  });
}
