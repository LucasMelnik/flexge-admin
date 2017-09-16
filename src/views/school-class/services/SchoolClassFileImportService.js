import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import NotificationService from '../../../core/services/NotificationService';

class SchoolClassFileImportService {
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      schoolId: null,
    });
  }

  init = action((schoolId) => {
    this.schoolId = schoolId;
  });

  handleUpload = action((file) => {
    const fileData = new FormData();
    fileData.append('spreadsheet', file);

    this.submit.fetch({
      url: `/schools/${this.schoolId}/import-students`,
      method: 'post',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(
          'File imported successfully.',
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to import file successfully.',
          null,
          null,
          'error',
        );
      }
    });
  });
}

const schoolClassFileImportService = new SchoolClassFileImportService();

export default schoolClassFileImportService;
