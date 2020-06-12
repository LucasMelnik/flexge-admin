import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { browserHistory } from 'react-router';

export default class PaymentFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      typeId: null,
    });
    this.form.validations = {
      student: [isRequired],
      type: [isRequired],
      dueAt: [isRequired],
      price: [isRequired],
    };
  }

  handleLoad = action((typeId) => {
    this.form.reset();
    if (typeId) {
      this.fetch.fetch({
        url: `/payments/${typeId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({
            ...this.fetch.data,
          });
        }
      });
    } else {
      this.form.setInitialValues({});
    }
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const typeId = this.form.getValue('id');
    this.submit.fetch({
      method: typeId ? 'put' : 'post',
      url: typeId ? `/payments/${typeId}` : '/payments',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        this.form.setInitialValues({});
        browserHistory.goBack();

        NotificationService.addNotification(`Payment ${typeId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${typeId ? 'updating' : 'creating'} payment.`, 'error');
      }
    });
  });
}
