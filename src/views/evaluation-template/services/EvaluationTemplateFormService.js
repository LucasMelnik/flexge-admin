import { action, extendObservable } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import { Roles } from '../../../core/util';

export default class EvaluationTemplateFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {});
    this.form.validations = {
      name: [isRequired],
      year: [isRequired],
      school: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER].some(r => r === localStorage.role) ? [isRequired] : [],
    };
  }

  handleLoad = action((evaluationTemplateId) => {
    this.form.reset();
    if (evaluationTemplateId) {
      this.fetch.fetch({
        url: `/evaluation-templates/${evaluationTemplateId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
      if (localStorage.role === Roles.SCHOOL_MANAGER) {
        this.form.setValue('school', localStorage.getItem('school'));
      }
    }
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const evaluationId = this.form.getValue('id');
    this.submit.fetch({
      method: evaluationId ? 'put' : 'post',
      url: evaluationId ? `/evaluation-templates/${evaluationId}` : '/evaluation-templates',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        browserHistory.push(`/evaluation-templates/${this.submit.data.id}`);
        NotificationService.addNotification(`Evaluation Template ${evaluationId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${evaluationId ? 'updating' : 'creating'} Evaluation Template.`, 'error');
      }
    });
  })
}
