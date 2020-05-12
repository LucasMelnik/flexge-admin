import { action, extendObservable } from 'mobx';
import FormService from '../../../core/services/FormService';
import FetchService from '../../../core/services/FetchService';
import { isRequired } from '../../../core/validations';
import NotificationService from '../../../core/services/NotificationService';
import UsageStatsListService from './UsageStatsListService';
import DemoStudentListService from './DemoStudentListService';

class UsageStatsFilterService {
  form = new FormService();
  download = new FetchService();

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
    if (localStorage.getItem('role') === 'ADMIN') {
      this.form.validations.distributor = [isRequired];
    }
    if (localStorage.getItem('role') === 'DISTRIBUTOR_MANAGER') {
      this.form.setValue('distributor', localStorage.getItem('distributor'));
    }
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
        distributor: [isRequired],
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
      DemoStudentListService.load(this.form.getValue('month'), this.form.getValue('distributor'));
    } else {
      DemoStudentListService.init();
    }
  });

  handleExport = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.download
      .fetch({
        responseType: 'blob',
        url: `/reports/${this.filterType}/usage-stats/student-export`,
        query: {
          ...this.form.getValues(),
          ...this.form.getValue('from') && {
            from: this.form.getValue('from').format('YYYY-MM-DD')
          },
          ...this.form.getValue('to') && {
            to: this.form.getValue('to').format('YYYY-MM-DD')
          },
        },
      })
      .then(() => {
        if (this.download.data) {
          const link = document.createElement('a');
          const fileUrl = window.URL.createObjectURL(this.download.data);
          link.href = fileUrl;

          link.download = `usage-report-${this.form.getValue('from').format('YYYY-MM-DD')}-${this.form.getValue('to').format('YYYY-MM-DD')}.csv`;
          link.click();
          setTimeout(() => window.URL.revokeObjectURL(fileUrl), 500);
        }
      });
  });
}

const usageStatsFilterService = new UsageStatsFilterService();

export default usageStatsFilterService;
