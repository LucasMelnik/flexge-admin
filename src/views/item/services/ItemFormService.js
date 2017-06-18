import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, minLength } from '../../../core/validations';

class ItemFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  defaultValidations = {
    type: [isRequired],
    grammar: [isRequired],
  };

  constructor() {
    extendObservable(this, {
      itemId: null,
      successCallback: null,
    });
    this.form.validations = {
      ...this.defaultValidations,
    };
  }

  setValidationsByItemType = action(() => {

    switch (this.form.getValue('type').key) {
      case 'VIDEO':
        this.form.validations = {
          ...this.defaultValidations,
          link: [isRequired],
          startTime: [isRequired],
          endTime: [isRequired],
        };
        break;
      case 'VIDEO_SHORT':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          link: [isRequired],
          startTime: [isRequired],
          endTime: [isRequired],
        };
        break;
      case 'VIDEO_TEXT_AREA':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          link: [isRequired],
          startTime: [isRequired],
          endTime: [isRequired],
          indexesToRemove: [isRequired, minLength(10)],
        };
        break;
      case 'SINGLE_CHOICE_TEXT':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'DICTATION':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          answers: [isRequired, minLength(1)],
        };
        break;
      case 'GAP_FILL':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          indexesToRemove: [isRequired, minLength(1)],
          answers: [isRequired, minLength(4)],
        };
        break;
      case 'GAP_FILL_SELECT':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          indexesToRemove: [isRequired, minLength(1)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'GAP_FILL_MULTIPLE':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          indexesToRemove: [isRequired, minLength(1)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'PRESENTATION':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          title: [isRequired],
        };
        break;
      case 'PRONUNCIATION':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
        };
        break;
      case 'SPEECH_PRACTICE':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
        };
        break;
      case 'TEXT':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
        };
        break;
      case 'TRUE_FALSE':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          answers: [isRequired, minLength(2)],
        };
        break;
      case 'UNSCRAMBLE_DRAG_AND_DROP':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          indexesToRemove: [isRequired, minLength(3)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'UNSCRAMBLE_SPEECH_RECOG':
        this.form.validations = {
          ...this.defaultValidations,
          text: [isRequired],
          translation: [isRequired],
          indexesToRemove: [isRequired, minLength(3)],
        };
        break;
      default:
        break;
    }

    if (this.form.getValue('id')) {
      this.form.setInitialValues({
        id: this.form.getValue('id'),
        unit: this.form.getValue('unit'),
        type: this.form.getValue('type'),
        grammar: this.form.getValue('grammar'),
      });
    } else {
      this.form.setInitialValues({
        unit: this.form.getValue('unit'),
        type: this.form.getValue('type'),
        grammar: this.form.getValue('grammar'),
      });
    }
    this.form.reset();
  });

  init = action((successCallback) => {
    this.successCallback = successCallback;
  });

  handleLoad = action((itemId) => {
    if (itemId) {
      this.fetch.fetch({
        url: `/items/${itemId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.form.reset();
    this.itemId = itemId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      console.log(this.form.errors)
      return;
    }
    const itemId = this.form.getValue('id');
    this.submit.fetch({
      method: itemId ? 'put' : 'post',
      url: itemId ? `/items/${itemId}` : '/items',
      body: {
        ...this.form.getValues(),
        type: this.form.getValue('type').id,
        grammar: this.form.getValue('grammar').id,
      },
    }).then(() => {
      if (this.submit.data) {
        const item = this.submit.data;
        if (this.successCallback) {
          this.successCallback(item, itemId === undefined);
        } else {
          browserHistory.push(`/items/${item.id}`);
          this.itemId = item.id;
          this.form.reset();
          this.form.setInitialValues(item);
        }
        NotificationService.addNotification(
          `Item ${itemId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${itemId ? 'updating' : 'creating'} item.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const itemFormService = new ItemFormService();

export default itemFormService;
