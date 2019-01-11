import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

export default class ParentFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      studentId: null,
      onSuccess: null,
    });
    this.form.validations = {
      name: [isRequired],
      email: [isRequired, isValidEmail],
    };
  }

  handleLoad = action((parentId, studentId, onSuccess) => {
    this.studentId = studentId;
    this.onSuccess = onSuccess;

    if (parentId) {
      this.fetch.fetch({
        url: `/students/${studentId}/parents/${parentId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.form.reset();
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const parentId = this.form.getValue('id');
    this.submit.fetch({
      method: parentId ? 'put' : 'post',
      url: parentId ? `/students/${this.studentId}/parents/${parentId}` : `/students/${this.studentId}/parents`,
      body: {
        name: this.form.getValue('name'),
        email: this.form.getValue('email'),
        ...this.form.getValue('password') && {
          password: this.form.getValue('password'),
        },
        ...this.form.getValue('contactType') && {
          contactType: this.form.getValue('contactType'),
        },
        ...this.form.getValue('contactPhone') && {
          contactPhone: this.form.getValue('contactPhone'),
        },
        ...this.form.getValue('observation') && {
          observation: this.form.getValue('observation'),
        },
      },
    }).then(() => {
      if (this.submit.data) {
        if (this.onSuccess) {
          this.onSuccess();
        }

        NotificationService.addNotification(
          `Parent ${parentId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        if (this.submit.error && this.submit.error.indexOf('E11000') > -1) {
          NotificationService.addNotification(
            'We already have a user with this email.',
            'error',
          );
        } else {
          NotificationService.addNotification(
            this.submit.error || `Error ${parentId ? 'updating' : 'creating'} parent.`,
            'error',
          );
        }
      }
    });
  })
}
