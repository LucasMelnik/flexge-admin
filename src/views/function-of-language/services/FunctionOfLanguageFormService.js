import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class FunctionOfLanguageFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      functionId: null,
    });
    this.form.validations = {
      title: [isRequired],
      grammar: [isRequired],
    };
  }

  handleLoad = action((functionId) => {
    this.form.reset();
    if (functionId) {
      this.fetch.fetch({
        url: `/functions-of-language/${functionId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.functionId = functionId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const functionId = this.form.getValue('id');
    this.submit.fetch({
      method: functionId ? 'put' : 'post',
      url: functionId ? `/functions-of-language/${functionId}` : '/functions-of-language',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const grammar = this.submit.data;
        this.functionId = grammar.id;
        this.form.reset();
        this.form.setInitialValues(grammar);

        NotificationService.addNotification(`Function of Language ${functionId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${functionId ? 'updating' : 'creating'} grammar.`, 'error');
      }
    });
  });
}
