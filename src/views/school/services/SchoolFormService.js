import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ScoolFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((schoolId) => {
    this.form.reset();
    if (schoolId) {
      this.fetch.fetch({
        url: `/schools/${schoolId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    }
    this.schoolId = schoolId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const schoolId = this.form.getValue('id');
    this.submit.fetch({
      method: schoolId ? 'put' : 'post',
      url: schoolId ? `/schools/${schoolId}` : '/schools',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        browserHistory.push(`/schools/${school.id}`);
        this.schoolId = school.id;
        this.form.reset();
        this.form.setInitialValues(school);
        NotificationService.addNotification(
          `Scool ${schoolId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${schoolId ? 'updating' : 'creating'} school.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const schoolFormService = new ScoolFormService();

export default schoolFormService;
