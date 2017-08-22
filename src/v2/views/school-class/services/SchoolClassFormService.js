import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class SchoolClassFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
      classId: null,
      successCallback: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  init = action((schoolId, classId, successCallback) => {
    this.schoolId = schoolId;
    this.classId = classId;
    this.successCallback = successCallback;
    if (this.classId) {
      this.handleLoad();
    } else {
      this.form.reset();
      this.form.setInitialValues({
        school: this.schoolId,
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
          teacher: this.fetch.data.teacher.id,
        });
      }
    });
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const classId = this.form.getValue('id');
    this.submit.fetch({
      method: classId ? 'put' : 'post',
      url: classId ? `/schools/${this.form.getValue('school')}/classes/${classId}` : `/schools/${this.form.getValue('school')}/classes`,
      body: {
        ...this.form.getValues(),
        teacher: this.form.getValue('teacher'),
      },
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(school);
        NotificationService.addNotification(
          `School Class ${classId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );

        if (this.successCallback) {
          this.successCallback();
        }
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${classId ? 'updating' : 'creating'} school class.`,
          null,
          null,
          'danger',
        );
      }
    });
  })

  handleAddStudent = action((studentId) => {
    const classId = this.form.getValue('id');
    this.submit.fetch({
      method: 'put',
      url: `/schools/${this.schoolId}/classes/${classId}/students/${studentId}`,
    }).then(() => {
      if (this.submit.data) {
        this.handleLoad(classId);
        NotificationService.addNotification(
          'Student added to Class successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error trying to add Student to Class.',
          null,
          null,
          'danger',
        );
      }
    });
  });

  handleRemoveStudent = action((studentId) => {
    const classId = this.form.getValue('id');
    this.submit.fetch({
      method: 'delete',
      url: `/schools/${this.schoolId}/classes/${classId}/students/${studentId}`,
    }).then(() => {
      if (this.submit.data) {
        this.handleLoad(classId);
        NotificationService.addNotification(
          'Student removed from Class successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error trying to remove Student to Class.',
          null,
          null,
          'danger',
        );
      }
    });
  });
}

const schoolClassFormService = new SchoolClassFormService();

export default schoolClassFormService;
