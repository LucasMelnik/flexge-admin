import { extendObservable, action } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import EvaluationPeriodListService from './EvaluationPeriodListService';
import { isRequired } from '../../../core/validations';

class EvaluationPeriodFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      evaluationTemplateId: null,
    });
    this.form.validations = {
      name: [isRequired],
      type: [isRequired],
      start: [isRequired],
      end: [isRequired],
    };
  }

  init = action((evaluationTemplateId) => {
    this.evaluationTemplateId = evaluationTemplateId;
    this.form.setInitialValues({});
    this.form.reset();
  });

  handleEdit = action((evaluationPeriod) => {
    this.form.setInitialValues({
      ...evaluationPeriod,
      start: moment(evaluationPeriod.start),
      end: moment(evaluationPeriod.end),
    });
    this.form.reset();
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const periodId = this.form.getValue('id');
    this.submit.fetch({
      method: periodId ? 'put' : 'post',
      url: periodId ? `/evaluation-templates/${this.evaluationTemplateId}/periods/${periodId}` : `/evaluation-templates/${this.evaluationTemplateId}/periods`,
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({});
        this.form.reset();
        EvaluationPeriodListService.load();
        NotificationService.addNotification(`Evaluation Period ${periodId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${periodId ? 'updating' : 'creating'} Evaluation Period.`, 'error');
      }
    });
  })
}

const evaluationPeriodFormService = new EvaluationPeriodFormService();

export default evaluationPeriodFormService;
