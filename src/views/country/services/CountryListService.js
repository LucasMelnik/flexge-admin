import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CountryListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      countries: [],
      filter: '',
    });
  }

  init = action(() => {
    this.countries = [];
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/countries',
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
        this.countries = this.fetch.data;
      } else {
        this.countries = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.filter = value;
    this.load();
  });

  handleRemove = action((country) => {
    ConfirmationDialogService.show(
      'Delete Country',
      `You are about to delete the Country "${country.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/countries/${country.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Country "${country.name}" deleted successfully.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const countryListService = new CountryListService();

export default countryListService;
