import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class TeacherFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      teacherId: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
      company: [isRequired],
    };
  }

  handleLoad = action((teacherId) => {
    this.form.reset();
    if (teacherId) {
      this.fetch.fetch({
        url: `/teachers/${teacherId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.teacherId = teacherId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const teacherId = this.form.getValue('id');
    this.submit.fetch({
      method: teacherId ? 'put' : 'post',
      url: teacherId ? `/teachers/${teacherId}` : '/teachers',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const teacher = this.submit.data;
        browserHistory.push(`/teachers/${teacher.id}`);
        this.teacherId = teacher.id;
        this.form.reset();
        this.form.setInitialValues(teacher);
        NotificationService.addNotification(
          `Teacher ${teacherId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${teacherId ? 'updating' : 'creating'} teacher.`,
          null,
          null,
          'danger',
        );
      }
    });
  });
}

const teacherFormService = new TeacherFormService();

export default teacherFormService;