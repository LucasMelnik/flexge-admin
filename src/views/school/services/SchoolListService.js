import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class SchoolListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      schools: [],
      filter: '',
      companyId: null,
    });
  }

  init = action((companyId) => {
    this.filter = '';
    this.companyId = companyId;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/schools',
      query: {
        query: {
          ...this.companyId && {
            company: this.companyId,
          },
          ...this.filter && {
            name: {
              $regex: this.filter,
              $options: 'i',
            },
          },
        },
      },
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
    this.load();
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
          this.load();
        });
      });
  });
}

const schoolListService = new SchoolListService();

export default schoolListService;
