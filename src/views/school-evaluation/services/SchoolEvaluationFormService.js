import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import SchoolEvaluationListService from './SchoolEvaluationListService';

export default class SchoolEvaluationFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      name: [isRequired],
      bonusWeeks: [isRequired],
      start: [isRequired],
      end: [isRequired],
      school: [isRequired],
    };
  }

  init = action((schoolId, evaluationId) => {
    this.schoolId = schoolId;
    this.evaluationId = evaluationId;
    this.handleLoad(evaluationId);
  });

  handleLoad = action((evaluationId) => {
    this.form.reset();
    if (evaluationId) {
      this.fetch.fetch({
        url: `/schools/${this.schoolId}/evaluations`,
      }).then(() => {
        if (this.fetch.data) {
          const data = {
            ...this.fetch.data,
            company: this.fetch.data.company.id,
          };
          this.form.setInitialValues(data);
        }
      });
    } else {
      this.form.setInitialValues({ school: this.schoolId });
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
      url: evaluationId ? `/schools/${this.schoolId}/evaluations/${evaluationId}` : `/schools/${this.schoolId}/evaluations`,
      body: {
        ...this.form.getValues(),
        year: this.form.getValue('start').year(),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({ school: this.schoolId });
        this.form.reset();
        SchoolEvaluationListService.load();
        NotificationService.addNotification(`Evaluation Period ${evaluationId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${evaluationId ? 'updating' : 'creating'} Evaluation Period.`, 'error');
      }
    });
  })
}
