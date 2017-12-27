import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CertificationTestExecutionListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTests: [],
      filter: '',
      status: null,
    });
    this.form.validations = {
      scheduleForDate: [isRequired],
      scheduleForTime: [isRequired],
    };
  }

  init = action((status) => {
    this.certificationTests = [];
    this.filter = '';
    this.status = status;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/certification-test-execution',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        if (this.status === 'PENDING') {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => !certificationTest.scheduledFor);
        } else if (this.status === 'SCHEDULED') {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => certificationTest.scheduledFor
              && !certificationTest.completedAt);
        } else {
          this.certificationTests = this.fetch.data
            .filter(certificationTest => certificationTest.completedAt);
        }
      } else {
        this.certificationTests = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleSubmitSchedule = action((certificationTest, callbackAfterSubmit) => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.submit.fetch({
      method: 'put',
      url: `/certification-test/${certificationTest.id}`,
      body: {
        ...certificationTest,
        scheduledFor: this.form.getValue('scheduleForDate').hours(this.form.getValue('scheduleForTime').hour()).minutes(this.form.getValue('scheduleForTime').minutes()),
        student: certificationTest.student.id,
      },
    }).then(() => {
      if (this.submit.data) {
        this.load();
        callbackAfterSubmit();
        NotificationService.addNotification(`Certification test schedule ${this.submit.data.certificationTest.id ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${certificationTest.id ? 'updating' : 'creating'} certificationTest.`, 'error');
      }
    });
  });
}
