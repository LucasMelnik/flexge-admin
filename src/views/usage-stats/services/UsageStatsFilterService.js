import { action, extendObservable } from 'mobx';
import FormService from '../../../core/services/FormService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';
import UsageStatsListService from './UsageStatsListService';
import DemoStudentListService from './DemoStudentListService';

class UsageStatsFilterService {
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schools: [],
    });
    this.form.validations = {
      month: [isRequired],
    };
  }

  init = action(() => {
    this.form.setInitialValues({});
  });

  handleSearch = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    UsageStatsListService.load(this.form.getValue('month'), this.form.getValue('company'));
    DemoStudentListService.load(this.form.getValue('month'));
  });
}

const usageStatsFilterService = new UsageStatsFilterService();

export default usageStatsFilterService;
