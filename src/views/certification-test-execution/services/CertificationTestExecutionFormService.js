import { extendObservable, action } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CertificationTestExecutionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      certificationTestId: null,
      currentStudentName: '',
    });
    this.form.validations = {
      document: [isRequired],
    };
  }

  handleLoad = action((certificationTestId) => {
    this.form.reset();
    if (certificationTestId) {
      this.fetch.fetch({
        url: `/certification-test/${certificationTestId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.currentStudentName = this.fetch.data.student.name;
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.certificationTestId = certificationTestId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    if (this.form.getValue('student.name') !== this.currentStudentName) {
      this.submit.fetch({
        method: 'put',
        url: `/students/${this.form.getValue('student.id')}`,
        body: {
          ...this.form.getValue('student'),
          name: this.form.getValue('student.name'),
        },
      });
    }

    const certificationTestId = this.form.getValue('id');
    this.submit.fetch({
      method: 'put',
      url: `/certification-test/${certificationTestId}`,
      body: {
        ...this.form.getValues(),
        student: this.form.getValue('student').id,
        enabledAt: moment(),
      },
    }).then(() => {
      if (this.submit.data) {
        const certificationTest = this.submit.data;
        this.certificationTestId = certificationTest.id;

        NotificationService.addNotification(`Certification ${certificationTestId ? 'enabled' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${certificationTestId ? 'updating' : 'creating'} certificationTest.`, 'error');
      }
    });
  });
}
