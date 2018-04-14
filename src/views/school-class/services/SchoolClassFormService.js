import { extendObservable, action } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class SchoolClassFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
      classId: null,
    });
    this.form.validations = {
      name: [isRequired],
      teacher: [isRequired],
      weeklyHoursRequired: [isRequired],
    };
  }

  init = action((schoolId, classId) => {
    this.schoolId = schoolId;
    this.classId = classId;
    if (this.schoolId && this.classId) {
      this.handleLoad();
    } else {
      this.form.reset();
      this.form.setInitialValues({
        school: this.schoolId,
        isIntensiveCourse: false,
      });
    }
  });

  handleLoad = action(() => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/${this.classId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.reset();
        this.form.setInitialValues({
          ...this.fetch.data,
          teacher: this.fetch.data.teacher && this.fetch.data.teacher.id,
          isPlacementTestClass: this.fetch.data.isPlacementTestClass,
          isIntensiveCourse: this.fetch.data.isIntensiveCourse || false,
          school: this.fetch.data.school.id,
          start: this.fetch.data.start && moment(this.fetch.data.start),
          end: this.fetch.data.start && moment(this.fetch.data.end),
        });
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const classId = this.form.getValue('id');
    const schoolId = this.form.getValue('school');
    this.submit.fetch({
      method: classId ? 'put' : 'post',
      url: classId ? `/schools/${schoolId}/classes/${classId}` : `/schools/${schoolId}/classes`,
      body: {
        ...this.form.getValues(),
        teacher: this.form.getValue('teacher'),
        isPlacementTestClass: this.form.getValue('isPlacementTestClass') ? this.form.getValue('isPlacementTestClass') : false,
        isIntensiveCourse: this.form.getValue('isIntensiveCourse') ? this.form.getValue('isIntensiveCourse') : false,
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(school);
        NotificationService.addNotification(
          `School Class ${classId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${classId ? 'updating' : 'creating'} school class.`,
          'error',
        );
      }
    });
  });
}
