import { action, extendObservable } from 'mobx';
import pickBy from 'lodash/pickBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class SuspectUsageAlertListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();
  reviewForm = new FormService();

  constructor() {
    extendObservable(this, {
      alerts: [],
      isReviewOpen: false,
      showPendingAlert: false,
      pendingAlertCount: 0,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
    this.form.validations = {
      filterType: [isRequired],
    };
  }

  init = action(() => {
    this.alerts = [];
    this.form.setInitialValues({ filterType: 'pending' });
    if (localStorage.role === 'SCHOOL_MANAGER') {
      this.form.setValue('school', localStorage.getItem('school'));
    }
    this.load();
  });

  load = action((pagination) => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    if (pagination) {
      this.pagination.current = pagination.current;
    }

    this.fetch.fetch({
      url: '/suspicious-executions',
      query: {
        page: this.pagination.current,
        size: this.pagination.pageSize,
        query: {
          ...pickBy(this.form.getValues(), x => !!x),
          ...this.form.getValue('from') && {
            from: this.form.getValue('from').format('YYYY-MM-DD')
          },
          ...this.form.getValue('to') && {
            to: this.form.getValue('to').format('YYYY-MM-DD')
          },
        }
      },
    }).then(() => {
      if (this.fetch.data) {
        this.alerts = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.alerts = [];
      }
    });
  });

  handleRemove = action((alert) => {
    ConfirmationDialogService.show(
      'Delete Alert',
      `You are about to delete the Alert. Do you want to continue ?`,
      () => {
        this.submit.fetch({
          url: `/suspicious-executions/${alert.id}`,
          method: 'delete',
        }).then(() => {
          if (this.submit.data) {
            NotificationService.addNotification('Alert deleted successfully.', 'success');
            this.load();
          }
          if (this.submit.error) {
            NotificationService.addNotification(this.submit.error, 'error');
          }
        });
      });
  });

  initReview = action((alert) => {
    this.isReviewOpen = true;
    this.reviewForm.setInitialValues({
      id: alert.id,
    });
  });

  discardReview = action(() => {
    this.isReviewOpen = false;
    this.reviewForm.setInitialValues({});
  });

  handleReview = action(() => {
    this.submit.fetch({
      url: `/suspicious-executions/${this.reviewForm.getValue('id')}/review`,
      method: 'patch',
      body: {
        reviewNotes: this.reviewForm.getValue('reviewNotes')
      }
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification('Alert resolved successfully.', 'success');
        this.isReviewOpen = false;
        this.load();
      }
      if (this.submit.error) {
        NotificationService.addNotification(this.submit.error, 'error');
      }
    });
  });

  countPending = action(() => {
    this.fetch.fetch({
      url: '/suspicious-executions/pending-count',
    }).then(() => {
      if (this.fetch.data && this.fetch.data.total > 0) {
        this.pendingAlertCount = this.fetch.data.total;
        this.showPendingAlert = true;
      } else {
        this.pendingAlertCount = 0;
        this.showPendingAlert = false;
      }
    });
  });

}

const suspectUsageAlertListService = new SuspectUsageAlertListService();

export default suspectUsageAlertListService;
