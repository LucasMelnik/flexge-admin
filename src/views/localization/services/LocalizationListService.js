import { action, extendObservable } from 'mobx';
import { pickBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import FormService from '../../../core/services/FormService';

class LocalizationListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  init = action(() => {
    this.items = [];
    this.form.setInitialValues({
      type: 'STUDENT'
    });
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/localization-items',
      query: {
        query: {
          ...pickBy(this.form.getValues(), x => !!x),
          ...this.form.getValue('key') && {
            key: {
              $regex: this.form.getValue('key'),
              $options: 'i'
            }
          }
        }
      },
    }).then(() => {
      if (this.fetch.data) {
        this.items = this.fetch.data;
      } else {
        this.items = [];
      }
    });
  });

  handleSave = action((row, values) => {
    this.submit.fetch({
      url: `/localization-items/${row.id}`,
      method: 'put',
      body: {
        ...row,
        ...values
      }
    }).then(() => {
      NotificationService.addNotification(`Localization Item updated successfully.`, 'success');
      this.items = this.items.map(i => {
        if (i.id === row.id) {
          return {
            ...i,
            ...values
          }
        }
        return i;
      });
    });
  });

  handleRemove = action((row) => {
    ConfirmationDialogService.show(
      'Delete LocalizationItems',
      `You are about to delete the Item "${row.key}", Do you want to continue ?`,
      () => {
        this.submit.fetch({
          url: `/localization-items/${row.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification(`Localization Item "${row.key}" deleted successfully.`, 'success');
          this.load();
        });
      });
  });
}

const localizationListService = new LocalizationListService();

export default localizationListService;
