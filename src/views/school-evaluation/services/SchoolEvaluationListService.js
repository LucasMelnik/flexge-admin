import { action, extendObservable } from 'mobx';
import uniq from 'lodash/uniq';
import range from 'lodash/range';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class SchoolEvaluationListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      evaluations: [],
      evaluationsByYear: [],
      years: [],
      selectedYear: null,
    });
  }

  init = action((schoolId) => {
    this.evaluations = [];
    this.years = [];
    this.evaluationsByYear = [];
    this.schoolId = schoolId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/evaluations`,
    }).then(() => {
      if (this.fetch.data) {
        this.evaluations = orderBy(this.fetch.data, 'start', 'asc');
        const today = new Date();
        this.years = uniq([
          ...uniq(this.evaluations.map(evaluation => evaluation.year)),
          ...range(today.getFullYear(), today.getFullYear() + 6),
        ]);

        if (this.selectedYear) {
          this.evaluationsByYear = this.evaluations.filter(evaluation => evaluation.year === this.selectedYear);
          this.evaluationsByYear = sortBy(this.evaluationsByYear, 'start', 'asc');
        }
      } else {
        this.evaluations = [];
        this.evaluationsByYear = [];
      }
    });
  });

  handleSelectYear = action((year) => {
    this.evaluationsByYear = this.evaluations.filter(evaluation => evaluation.year === year);
    this.evaluationsByYear = sortBy(this.evaluationsByYear, 'start', 'asc');
    this.selectedYear = year;
  });

  handleRemove = action((evaluation) => {
    ConfirmationDialogService.show(
      'Delete Evaluation Period',
      `You are about to delete the period "${evaluation.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${this.schoolId}/evaluations/${evaluation.id}`,
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
      });
  });
}

const schoolEvaluationListService = new SchoolEvaluationListService();

export default schoolEvaluationListService;
