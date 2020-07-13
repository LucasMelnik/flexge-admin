import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';

class UploadContentService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {});
  }

  init = action(() => {
    this.form.setInitialValues({});
  })

  handleUpload = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const fileData = new FormData();
    fileData.append('file', this.form.getValue('file'));

    this.submit = new FetchService();
    this.submit.fetch({
      url: '/upload-content',
      method: 'post',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(
          'File loaded successfully. Await the data validation.',
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
}

const uploadContentService = new UploadContentService();

export default uploadContentService;