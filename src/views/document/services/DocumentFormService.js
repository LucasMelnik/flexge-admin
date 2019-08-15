import { action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class DocumentFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  handleLoad = action((documentId) => {
    this.form.reset();
    if (documentId) {
      this.fetch.fetch({
        url: `/documents/${documentId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
          this.form.validations = {
            title: [isRequired],
            order: [isRequired],
          };
        }
      });
    } else {
      this.form.setInitialValues({});
      this.form.validations = {
        title: [isRequired],
        order: [isRequired],
        file: [isRequired],
      };
    }
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }
    const documentId = this.form.getValue('id');

    const fileData = new FormData();
    fileData.append('file', this.form.getValue('file'));
    fileData.append('title', this.form.getValue('title'));
    fileData.append('order', this.form.getValue('order'));

    this.submit.fetch({
      method: documentId ? 'put' : 'post',
      url: documentId ? `/documents/${documentId}` : '/documents',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        const document = this.submit.data;
        this.form.reset();
        this.form.setInitialValues(document);

        NotificationService.addNotification(`Document ${documentId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${documentId ? 'updating' : 'creating'} document.`, 'error');
      }
    });
  });
}
