import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';

class UnitAverageExecutionTimeListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      units: [],
    });
    this.form.validations = {
      course: [isRequired],
      module: [isRequired],
    };
  }

  init = action(() => {
    this.units = [];
  });

  load = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    this.fetch.fetch({
      url: `/reports/courses/${this.form.getValue('course')}/modules/${this.form.getValue('module')}/unit-average-execution-time`,
    }).then(() => {
      if (this.fetch.data) {
        this.units = this.fetch.data;
      } else {
        this.units = [];
      }
    });
  });

}

const unitAverageExecutionTimeListService = new UnitAverageExecutionTimeListService();

export default unitAverageExecutionTimeListService;
