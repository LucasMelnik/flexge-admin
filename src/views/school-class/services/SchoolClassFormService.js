import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class ScoolClassFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      schoolId: null,
      successCallback: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  init = action((schoolId, successCallback) => {
    this.schoolId = schoolId;
    this.successCallback = successCallback;
  });

  handleLoad = action((classId) => {
    this.fetch.fetch({
      url: `/schools/${this.schoolId}/classes/${classId}`,
    }).then(() => {
      if (this.fetch.data) {
        this.form.reset();
        this.form.setInitialValues(this.fetch.data);
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
      url: classId ? `/schools/${this.schoolId}/classes/${classId}` : `/schools/${this.schoolId}/classes`,
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const school = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(school);
        NotificationService.addNotification(
          `Scool Class ${classId ? 'updated' : 'created'} successfully.`,
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

const schoolClassFormService = new ScoolClassFormService();

export default schoolClassFormService;
