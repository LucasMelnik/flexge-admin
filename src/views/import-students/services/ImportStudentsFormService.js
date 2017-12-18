import { extendObservable, action, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class ImportStudentsFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
    this.form.validations = {
      school: [isRequired],
    };
  }

  handleUpload = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const fileData = new FormData();
    fileData.append('spreadsheet', this.form.getValue('file'));

    this.submit = new FetchService();
    this.submit.fetch({
      url: `/schools/${this.form.getValue('school')}/import-students-preview`,
      method: 'post',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        this.form.setValue('students', toJS(this.submit.data));
        NotificationService.addNotification(
          'File loaded successfully.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to load the file.',
          'error',
        );
      }
    });
  });

  handleConfirm = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    this.submit = new FetchService();
    this.submit.fetch({
      url: `/schools/${this.form.getValue('school')}/import-students-confirm`,
      method: 'post',
      body: this.form.getValue('students'),
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({});
        NotificationService.addNotification(
          'Students saved.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to save students.',
          'error',
        );
      }
    });
  });
}
