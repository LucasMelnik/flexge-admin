import { action, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class ImportSchoolFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    this.form.validations = {
      distributor: [isRequired],
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
      url: `/distributors/${this.form.getValue('distributor')}/import-schools-preview`,
      method: 'post',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        this.form.setValue('schools', toJS(this.submit.data));
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
      url: `/distributors/${this.form.getValue('distributor')}/import-schools-confirm`,
      method: 'post',
      body: this.form.getValue('schools'),
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({});
        NotificationService.addNotification(
          'Schools saved.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to save schools.',
          'error',
        );
      }
    });
  });
}
