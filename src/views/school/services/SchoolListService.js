import { action, extendObservable, computed } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class SchoolListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schools: [],
      filter: '',
      companyId: null,
      visibleSchools: computed(() => (
        this.schools.filter(school => (
          school.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
          school.company.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        ))
      )),
    });
  }

  init = action((companyId) => {
    this.schools = [];
    this.filter = '';
    this.companyId = companyId;
    this.load();
  });

  load = action(() => {
    const query = {
      query: {
        ...this.companyId && {
          company: this.companyId,
        },
      },
    };
    this.fetch.fetch({
      url: '/schools',
      query,
    }).then(() => {
      if (this.fetch.data) {
        this.schools = this.fetch.data;
      } else {
        this.schools = [];
        this.total = 0;
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
  });

  handleRemove = action((school) => {
    ConfirmationDialogService.show(
      'Delete School',
      `You are about to delete the school "${school.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/schools/${school.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification('School deleted successfully.', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const schoolListService = new SchoolListService();

export default schoolListService;
