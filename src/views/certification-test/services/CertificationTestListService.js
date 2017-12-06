import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CertificationTestListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      certificationTests: [],
      filter: '',
    });
  }

  init = action(() => {
    this.certificationTests = [];
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/certification-test',
      query: {
        query: this.filter && {
          name: {
            $regex: this.filter,
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.certificationTests = this.fetch.data;
      } else {
        this.certificationTests = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((certificationTest) => {
    ConfirmationDialogService.show(
      'Delete Certification Test',
      `You are about to delete the Certification Test "${certificationTest.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/certification-test/${certificationTest.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Certification Test "${certificationTest.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const certificationTestListService = new CertificationTestListService();

export default certificationTestListService;
