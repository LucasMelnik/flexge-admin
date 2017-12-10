import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class CertificationTestListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTests: [],
      filter: '',
    });
    this.form.validations = {
      scheduleForDate: [isRequired],
      scheduleForTime: [isRequired],
    };
  }

  init = action(() => {
    this.certificationTests = [];
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/certification-test',
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
        this.certificationTests = this.fetch.data;
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
        NotificationService.addNotification(`Certification test schedule ${this.submit.data.id ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${certificationTest.id ? 'updating' : 'creating'} certificationTest.`, 'error');
      }
    });
  });
}

const certificationTestListService = new CertificationTestListService();

export default certificationTestListService;
