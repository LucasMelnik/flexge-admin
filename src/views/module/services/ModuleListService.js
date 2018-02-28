import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class ModuleListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      modules: [],
    });
  }

  init = action(() => {
    this.modules = [];
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/modules',
      query: {
        verbose: true,
        query: {
          ...this.form.getValue('filter') && {
            name: {
              $regex: this.form.getValue('filter'),
              $options: 'i',
            },
          },
          ...this.form.getValue('course') && {
            course: this.form.getValue('course'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.modules = orderBy(this.fetch.data, ['course.name', 'group', 'order'], ['asc', 'asc', 'asc']);
      } else {
        this.modules = [];
      }
    });
  });

  handleRemove = action((module) => {
    ConfirmationDialogService.show(
      'Delete Module',
      `You are about to delete the module "${module.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/modules/${module.id}`,
          method: 'delete',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`Module ${module.name} deleted.`, 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });
}

const moduleListService = new ModuleListService();

export default moduleListService;
