import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class ChangeCourseFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      studentId: null,
    });
    this.form.validations = {
      academicPlan: [isRequired],
      currentCourse: [isRequired],
      newCourse: [isRequired],
    };
  }

  handleLoad = action((studentId) => {
    this.form.reset();
    this.fetch.fetch({
      url: `/students/${studentId}`,
    }).then(() => {
      if (this.fetch.data) {
        const data = {
          ...this.fetch.data,
          ...this.fetch.data.currentCourse && {
            currentCourse: this.fetch.data.currentCourse.id,
          },
          ...this.fetch.data.academicPlan && {
            academicPlan: this.fetch.data.academicPlan.id,
          },
        };
        this.form.setInitialValues(data);
      }
    });
    this.studentId = studentId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    this.submit.fetch({
      method: 'patch',
      url: `/students/${this.form.getValue('id')}/courses/${this.form.getValue('newCourse')}` ,
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(
          'Student course successfully changed.',
          'success',
        );
        window.location.reload();
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error changing student course.',
          'error',
        );
      }
    });
  })
}
