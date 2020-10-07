import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class GrammarFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      grammarId: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((grammarId) => {
    this.form.reset();
    if (grammarId) {
      this.fetch.fetch({
        url: `/grammars/${grammarId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.grammarId = grammarId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const grammarId = this.form.getValue('id');
    this.submit.fetch({
      method: grammarId ? 'put' : 'post',
      url: grammarId ? `/grammars/${grammarId}` : '/grammars',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const grammar = this.submit.data;
        this.grammarId = grammar.id;
        this.form.reset();
        this.form.setInitialValues(grammar);

        NotificationService.addNotification(`Grammar ${grammarId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${grammarId ? 'updating' : 'creating'} grammar.`, 'error');
      }
    });
  });
}
