import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class CourseFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      courseId: null,
    });
    this.form.validations = {
      name: [isRequired],
      description: [isRequired],
    };
  }

  handleLoad = action((courseId) => {
    this.form.reset();
    if (courseId) {
      this.fetch.fetch({
        url: `/courses/${courseId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.courseId = courseId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const courseId = this.form.getValue('id');
    this.submit.fetch({
      method: courseId ? 'put' : 'post',
      url: courseId ? `/courses/${courseId}` : '/courses',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const course = this.submit.data;
        this.courseId = course.id;
        this.form.reset();
        this.form.setInitialValues(course);

        NotificationService.addNotification(`Course ${courseId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${courseId ? 'updating' : 'creating'} course.`, 'error');
      }
    });
  });
}
