import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class StateFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      stateId: null,
    });
    this.form.validations = {
      name: [isRequired],
      country: [isRequired],
    };
  }

  handleLoad = action((stateId) => {
    this.form.reset();
    if (stateId) {
      this.fetch.fetch({
        url: `/states/${stateId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.stateId = stateId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const stateId = this.form.getValue('id');
    this.submit.fetch({
      method: stateId ? 'put' : 'post',
      url: stateId ? `/states/${stateId}` : '/states',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const state = this.submit.data;
        this.stateId = state.id;
        this.form.reset();
        this.form.setInitialValues(state);

        NotificationService.addNotification(`State ${stateId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${stateId ? 'updating' : 'creating'} state.`, 'error');
      }
    });
  });
}
