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
    this.page = 1;
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/modules',
      query: {
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
          NotificationService.addNotification(`Module ${module.name} deleted.`, 'success');
          this.load();
        });
      });
  });
}

const moduleListService = new ModuleListService();

export default moduleListService;
