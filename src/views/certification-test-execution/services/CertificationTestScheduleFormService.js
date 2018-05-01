import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CertificationTestScheduleFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      isOpen: false,
      certificationTest: {},
      successCallback: () => false,
    });
    this.form.validations = {
      scheduleForDate: [isRequired],
      scheduleForTime: [isRequired],
    };
  }

  init = action((certificationTest, successCallback) => {
    this.certificationTest = certificationTest;
    this.successCallback = successCallback;
    if (certificationTest.scheduledFor) {
      this.form.setInitialValues({
        scheduleForDate: moment(certificationTest.scheduledFor),
        scheduleForTime: moment(certificationTest.scheduledFor),
      });
    } else {
      this.form.setInitialValues({});
    }
  });

  handleOpen = action(() => {
    this.isOpen = true;
    this.form.reset();
  });

  handleCancel = action(() => {
    this.isOpen = false;
    this.form.reset();
  });

  handleSubmitSchedule = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.submit.fetch({
      method: 'put',
      url: `/certification-test/${this.certificationTest.id}/schedule`,
      body: {
        scheduledFor: this.form.getValue('scheduleForDate').hours(this.form.getValue('scheduleForTime').hour()).minutes(this.form.getValue('scheduleForTime').minutes()),
      },
    }).then(() => {
      if (this.submit.data) {
        this.isOpen = false;
        this.successCallback();
        NotificationService.addNotification(`Certification test schedule ${this.submit.data.id ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${this.certificationTest.id ? 'updating' : 'creating'} certificationTest.`, 'error');
      }
    });
  });
}
