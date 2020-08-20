import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { browserHistory } from 'react-router';

export default class LocalizationFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      localizationId: null,
    });
    this.form.validations = {
      key: [isRequired],
      type: [isRequired],
      portuguese: [isRequired],
      english: [isRequired],
      spanish: [isRequired],
    };
  }

  handleLoad = action((localizationId) => {
    this.form.reset();
    this.form.setInitialValues({});

    if (localizationId) {
      this.fetch.fetch({
        url: `/localization-items/${localizationId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    }
    this.localizationId = localizationId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const localizationId = this.form.getValue('id');
    this.submit.fetch({
      method: localizationId ? 'put' : 'post',
      url: localizationId ? `/localization-items/${localizationId}` : '/localization-items',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        browserHistory.goBack();

        NotificationService.addNotification(`Localization Item ${localizationId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${localizationId ? 'updating' : 'creating'} localization Item.`, 'error');
      }
    });
  });
}
