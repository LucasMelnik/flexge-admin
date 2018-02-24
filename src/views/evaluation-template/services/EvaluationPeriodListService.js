import { action, extendObservable } from 'mobx';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class EvaluationPeriodListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      periods: [],
      evaluationTemplateId: null,
    });
  }

  init = action((evaluationTemplateId) => {
    this.periods = [];
    this.evaluationTemplateId = evaluationTemplateId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/evaluation-templates/${this.evaluationTemplateId}/periods`,
    }).then(() => {
      if (this.fetch.data) {
        this.periods = orderBy(this.fetch.data, 'start', 'asc');
      } else {
        this.periods = [];
      }
    });
  });

  handleRemove = action((evaluationPeriod) => {
    ConfirmationDialogService.show(
      'Delete Evaluation Period',
      `You are about to delete the period from "${moment(evaluationPeriod.start).format('DD/MM/YYYY')}" to "${moment(evaluationPeriod.end).format('DD/MM/YYYY')}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/evaluation-templates/${this.evaluationTemplateId}/periods/${evaluationPeriod.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('Evaluation Period deleted successfully.', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      },
    );
  });
}

const evaluationPeriodListService = new EvaluationPeriodListService();

export default evaluationPeriodListService;
