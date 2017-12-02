import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import UnitItemListService from './UnitItemListService';

export default class UnitItemCharacterFormService {
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
    });
    this.form.validations = {
      character: [isRequired],
    };
  }

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification(
        'Select the Character',
        'error',
      );
      return;
    }
    const promises = [];
    UnitItemListService.items
      .filter(unitItem => ![
        'VIDEO',
        'VIDEO_SHORT',
        'VIDEO_TEXT_AREA',
        'TEXT',
      ].find(type => type === unitItem.item.type.key))
      .forEach((unitItem) => {
        promises.push(this.submit.fetch({
          method: 'put',
          url: `/units/${unitItem.unit}/items/${unitItem.item.id}`,
          body: {
            ...unitItem,
            item: {
              ...unitItem.item,
              type: unitItem.item.type.id,
              ...unitItem.item.grammar && {
                grammar: unitItem.item.grammar.id,
              },
              character: this.form.getValue('character'),
            },
          },
        }));
      });

    Promise.all(promises)
      .then(() => {
        if (this.submit.data) {
          this.form.reset();
          this.form.setInitialValues({});
          UnitItemListService.load();
          NotificationService.addNotification(
            'Character set successfully',
            'success',
          );
        }
        if (this.submit.error) {
          NotificationService.addNotification(
            'Error to set the Character.',
            'error',
          );
        }
      });
  })
}
