import { extendObservable, action, observe } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import SchoolEvaluationListService from './SchoolEvaluationListService';
import { isRequired } from '../../../core/validations';

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

    observe(SchoolEvaluationListService, 'evaluationsByYear', () => {
      const yearEvaluationsCount = SchoolEvaluationListService.evaluationsByYear.length;
      if (yearEvaluationsCount) {
        const lastEvaluation = SchoolEvaluationListService.evaluationsByYear[yearEvaluationsCount - 1];
        this.form.setInitialValues({
          school: SchoolEvaluationListService.schoolId,
          start: moment(lastEvaluation.end).days(moment(lastEvaluation.end).days() + 1),
        });
      } else {
        this.form.setInitialValues({ school: SchoolEvaluationListService.schoolId });
      }
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
    this.form.reset();

    const yearEvaluationsCount = SchoolEvaluationListService.evaluationsByYear.length;
    if (yearEvaluationsCount) {
      const lastEvaluation = SchoolEvaluationListService.evaluationsByYear[yearEvaluationsCount - 1];
      this.form.setInitialValues({
        school: this.schoolId,
        start: moment(lastEvaluation.end).days(moment(lastEvaluation.end).days() + 1),
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
        this.form.reset();
        this.form.setInitialValues({
          school: this.schoolId,
          start: moment(this.submit.data.end).days(moment(this.submit.data.end).days() + 1),
        });
        SchoolEvaluationListService.load();
        NotificationService.addNotification(`Evaluation Period ${evaluationId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${evaluationId ? 'updating' : 'creating'} Evaluation Period.`, 'error');
      }
    });
  })
}