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
      filterType: 'month',
    });
    this.form.validations = {
      month: [isRequired],
    };
  }

  init = action(() => {
    this.form.setInitialValues({});
  });

  handleChangeType = action(type => {
    this.filterType = type;
    this.form.submitted = false;
    this.form.setInitialValues({});
    if (type === 'date-range') {
      this.form.validations = {
        from: [isRequired],
        to: [isRequired],
        distributor: [isRequired],
      };
    } else {
      this.form.validations = {
        month: [isRequired],
      };
    }
  });

  handleSearch = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    UsageStatsListService.load(this.filterType, this.form.getValues());
    if (this.filterType === 'month') {
      DemoStudentListService.load(this.form.getValue('month'));
    } else {
      DemoStudentListService.init();
    }
  });
}

const usageStatsFilterService = new UsageStatsFilterService();

export default usageStatsFilterService;
