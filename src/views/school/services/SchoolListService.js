import { action, extendObservable } from 'mobx';
import debounce from 'lodash/debounce';
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
      // visibleSchools: computed(() => (
      //   this.schools.filter(school => (
      //     school.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
      //     school.company.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
      //     (school.inep && school.inep.toLowerCase().indexOf(this.filter.toLowerCase()) > -1)
      //   ))
      // )),
      pagination: {
        current: 1,
        total: 0,
        pageSize: 50,
      },
    });
  }

  init = action((companyId) => {
    this.schools = [];
    this.filter = '';
    this.companyId = companyId;
    this.load();
  });

  load = action((pagination, filters, sort) => {
    if (pagination) {
      this.pagination.current = pagination.current;
    } else {
      this.pagination.current = 1;
    }

    const query = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      ...sort && sort.field && {
        sort: {
          [sort.field]: sort.order === 'descend' ? 'desc' : 'asc'
        }
      },
      query: {
        ...this.filter && {
          $or: [
            {name: {
              $regex: this.filter,
              $options: 'i'
            }},
            {inep: {
              $regex: this.filter,
              $options: 'i'
            }},
          ]
        },
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
        this.schools = this.fetch.data.docs;
        this.pagination.total = this.fetch.data.total;
      } else {
        this.schools = [];
        this.total = 0;
      }
    });
  });

  handleDebounceLoad = debounce(action(() => {
    this.load({ current: 1 })
  }), 1000);

  handleFilterChange = action((value) => {
    this.filter = value;
    this.handleDebounceLoad();
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
