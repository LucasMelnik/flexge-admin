import { extendObservable, action, toJS } from 'mobx';
import sample from 'lodash/sample';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';
import UnitItemListService from './UnitItemListService';

export default class UnitItemCharacterFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
    });
    this.form.validations = {
      character: [],
    };
  }

  init = action(() => {
    this.fetch.fetch({
      url: '/characters',
    }).then(() => {
      if (this.fetch.data) {
        this.characters = this.fetch.data;
      } else {
        this.characters = [];
      }
    });
  });

  handleSubmit = action(() => {
    this.form.validations.character = !this.form.getValue('randomCharacters') ? [isRequired] : [];
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification(
        'Select the Character',
        'error',
      );
      return;
    }
    if (!this.form.getValue('randomCharacters') && !this.form.getValue('character')) {
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
              character: this.form.getValue('randomCharacters') ? sample(toJS(this.characters)).id : this.form.getValue('character'),
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
