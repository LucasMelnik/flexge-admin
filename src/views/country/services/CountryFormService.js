import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CountryFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      countryId: null,
    });
    this.form.validations = {
      name: [isRequired],
      timezone: [isRequired],
      locale: [isRequired],
      code: [isRequired],
    };
  }

  handleLoad = action((countryId) => {
    this.form.reset();
    if (countryId) {
      this.fetch.fetch({
        url: `/countries/${countryId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.countryId = countryId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const countryId = this.form.getValue('id');
    this.submit.fetch({
      method: countryId ? 'put' : 'post',
      url: countryId ? `/countries/${countryId}` : '/countries',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const country = this.submit.data;
        this.countryId = country.id;
        this.form.reset();
        this.form.setInitialValues(country);

        NotificationService.addNotification(`Country ${countryId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${countryId ? 'updating' : 'creating'} country.`, 'error');
      }
    });
  });
}
