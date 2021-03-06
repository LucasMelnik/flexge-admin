import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class CertificationTestRegisterListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      registers: [],
      filter: '',
    });
  }

  init = action(() => {
    this.registers = [];
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/certification-test-course-ability',
      query: {
        query: {
          ...this.form.getValue('grammar') && { grammar: this.form.getValue('grammar') },
          ...this.form.getValue('course') && { course: this.form.getValue('course') },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.registers = orderBy(this.fetch.data, ['course.name', 'ability', 'order'], ['asc', 'asc', 'asc']).reduce((acc, item) => {
          const group = acc.find(x => item.course.name === x.course.name && item.ability === x.ability);
          if (!group) {
            return [
              ...acc,
              {
                course: item.course,
                ability: item.ability,
                items: item.items,
                itemsToShow: item.itemsToShow || 0,
                children: [item],
              }
            ];
          }

          group.itemsToShow += (item.itemsToShow || 0);
          group.items = group.items.concat(...item.items);
          group.children.push(item);
          return acc;
        }, []);
      } else {
        this.registers = [];
      }
    });
  });

  handleRemove = action((certificationTestRegister) => {
    ConfirmationDialogService.show(
      'Delete Certification Tests Register',
      `You are about to delete the register of course "${certificationTestRegister.course.name} - order ${certificationTestRegister.order}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/certification-test-course-ability/${certificationTestRegister.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Register deleted', 'success');
          this.load();
        });
      });
  });
}

const certificationTestRegisterListService = new CertificationTestRegisterListService();

export default certificationTestRegisterListService;
