import { extendObservable, action, observe } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import {
  isRequired,
  minLength,
  minFilteredLength,
  onlyOneCorrectAnswer,
  isValidTime,
  exactLength,
} from '../../../core/validations';

export default class ItemFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  defaultValidations = {
    'item.type': [isRequired],
    'item.time': [isRequired],
  };

  constructor(endpointUrl, order, onSaveSuccess, isTestItem) {
    extendObservable(this, {
      itemId: null,
    });
    this.isTestItem = isTestItem;
    this.onSaveSuccess = onSaveSuccess;
    this.endpointUrl = endpointUrl;
    this.order = order;
    this.form.validations = {
      ...this.defaultValidations,
    };
  }

  createTextObserver() {
    if (!this.form.getValues().item.text || !this.form.getValues().item.answers.length) {
      return;
    }

    // function to handle changes on item text and update answers
    observe(this.form.values.item, 'text', () => {
      const item = this.form.getValues().item;
      if (['GAP_FILL', 'GAP_FILL_MULTIPLE', 'GAP_FILL_SELECT', 'UNSCRAMBLE_DRAG_AND_DROP','UNSCRAMBLE_SPEECH_RECOGNITION'].find(type => type === item.type.key)) {
        if (item.answers) {
          const slices = item.text.trim().split(' ');
          item.answers = item.answers.reduce((acc, answer) => {
            if ((!answer.correct) || (answer.correct && answer.index < slices.length)) {
              if (answer.correct) {
                answer.text = slices[answer.index];
              }
              return [
                ...acc,
                answer,
              ];
            } else {
              return [
                ...acc,
              ];
            }
          }, []);
          this.form.setValue('item.answers', item.answers);
          this.form.setValue('item.indexesToRemove', item.answers.filter(slice => slice.index !== undefined));
        }
      }
    });
  }

  setValidationsByItemType = action(() => {
    const correctAnswerPredicate = answer => answer.correct;
    const wrongAnswerPredicate = answer => !answer.correct;

    switch (this.form.getValue('item.type').key) {
      case 'VIDEO':
        this.form.validations = {
          ...this.defaultValidations,
          'item.videoLink': [isRequired],
          'item.reference': [isRequired],
          'item.videoStartTime': [isRequired, isValidTime],
          'item.videoEndTime': [isRequired, isValidTime],
        };
        break;
      case 'VIDEO_SHORT':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': [isRequired],
          'item.videoLink': [isRequired],
          // 'item.reference': [isRequired],
          'item.videoStartTime': [isRequired, isValidTime],
          'item.videoEndTime': [isRequired, isValidTime],
        };
        break;
      case 'VIDEO_TEXT_AREA':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.videoLink': [isRequired],
          'item.reference': [isRequired],
          'item.videoStartTime': [isRequired, isValidTime],
          'item.videoEndTime': [isRequired, isValidTime],
          'item.indexesToRemove': [isRequired, minLength(10)],
        };
        break;
      case 'SINGLE_CHOICE_TEXT':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(1, correctAnswerPredicate, 'Add at least 1 correct answer'),
            minFilteredLength(3, wrongAnswerPredicate, 'Add at least 3 wrong answers'),
          ],
        };
        break;
      case 'SINGLE_CHOICE_IMAGE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(1, correctAnswerPredicate, 'Add at least 1 correct answer'),
            minFilteredLength(3, wrongAnswerPredicate, 'Add at least 3 wrong answers'),
          ],
        };
        break;
      case 'SINGLE_CHOICE_AUDIO':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(1, correctAnswerPredicate, 'Add at least 1 correct answer'),
            minFilteredLength(3, wrongAnswerPredicate, 'Add at least 3 wrong answers'),
          ],
        };
        break;
      case 'SINGLE_CHOICE_KIDS':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            // minFilteredLength(1, correctAnswerPredicate, 'Add at least 1 correct answer'),
            minFilteredLength(1, wrongAnswerPredicate, 'Add at least 1 wrong answers'),
          ],
        };
        break;
      case 'SINGLE_CHOICE_GAME':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(2, wrongAnswerPredicate, 'Add at least 2 wrong answers'),
            exactLength(3),
          ],
        };
        break;
      case 'DICTATION':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
        };
        break;
      case 'GAP_FILL':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(1)],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(3, wrongAnswerPredicate, 'Add at least 3 wrong answers'),
          ],
        };
        break;
      case 'GAP_FILL_IMAGE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(1)],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(2, wrongAnswerPredicate, 'Add at least 2 wrong answers'),
          ],
        };
        break;
      case 'GAP_FILL_SELECT':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(1)],
          'item.answers': [
            minFilteredLength(1, wrongAnswerPredicate, 'Add at least 1 wrong answers'),
          ],
        };
        break;
      case 'GAP_FILL_MULTIPLE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(2)],
          'item.answers': [
            minFilteredLength(1, wrongAnswerPredicate, 'Add at least 1 wrong answers'),
          ],
        };
        break;
      case 'GAP_FILL_LETTER':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(1)],
          'item.answers': [
            onlyOneCorrectAnswer,
            minFilteredLength(2, wrongAnswerPredicate, 'Add at least 2 wrong letters'),
          ],
        };
        break;
      case 'PRESENTATION':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          // audio: [isRequired],
          // image: [isRequired],
        };
        break;
      case 'PRONUNCIATION':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
        };
        break;
      case 'SPEECH_PRACTICE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
        };
        break;
      case 'TEXT':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
        };
        break;
      case 'TRUE_FALSE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            isRequired,
            exactLength(2),
          ],
        };
        break;
      case 'TRUE_FALSE_KIDS':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.answers': [
            onlyOneCorrectAnswer,
            isRequired,
            exactLength(2),
          ],
        };
        break;
      case 'UNSCRAMBLE_DRAG_AND_DROP':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired, minLength(3)],
          'item.answers': [
            minFilteredLength(1, wrongAnswerPredicate, 'Add at least 1 wrong answers'),
          ],
        };
        break;
      case 'UNSCRAMBLE_SPEECH_RECOGNITION':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.translation': this.isTestItem ? [] : [isRequired],
          'item.indexesToRemove': [isRequired],
          'item.answers': [value => value && value.filter(answer => !answer.linkTo).length > 4 && 'The maximum of gaps os 4'],
        };
        break;
      case 'FREE_TEXT':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.charactersMinLimit': [isRequired],
          'item.charactersMaxLimit': [isRequired],
        };
        break;
      case 'FREE_TEXT_IMAGE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.image': [isRequired],
          'item.charactersMinLimit': [isRequired],
          'item.charactersMaxLimit': [isRequired],
        };
        break;
      case 'FREE_SPEAK':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
        };
        break;
      case 'FREE_SPEAK_IMAGE':
        this.form.validations = {
          ...this.defaultValidations,
          'item.image': [isRequired],
        };
        break;
      case 'CONNECTING_DOTS':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.postPhrase': [isRequired],
        };
        break;
      case 'MEMORY_GAME':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.postPhrase': [isRequired],
        };
        break;
      case 'VOCABULARY_GAME':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.postPhrase': [isRequired],
        };
        break;
      case 'VOCABULARY':
        this.form.validations = {
          ...this.defaultValidations,
          'item.text': [isRequired],
          'item.postPhrase': [isRequired],
        };
        break;
      case 'PHONEME':
        this.form.validations = {
          ...this.defaultValidations,
          'item.title': [isRequired],
          'item.text': [isRequired],
          'item.postPhrase': [isRequired],
        };
        break;
      default:
        break;
    }

    if (!this.form.getValue('item.id')) {
      this.form.setInitialValues({
        item: this.form.getValue('item'),
      });
    }
    // this.form.reset();
  });

  handleLoad = action((itemId, defaultGrammar) => {
    if (itemId) {
      this.fetch.fetch({
        url: `/${this.endpointUrl}/${itemId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues({
            ...this.fetch.data,
            'item.indexesToRemove': this.fetch.data, // to validation works
            item: {
              ...this.fetch.data.item,
              ...this.fetch.data.item.videoStartTime && {
                videoStartTime: this.fetch.data.item.videoStartTime.length === 4 ? `00${this.fetch.data.item.videoStartTime}` : this.fetch.data.item.videoStartTime,
              },
              ...this.fetch.data.item.videoEndTime && {
                videoEndTime: this.fetch.data.item.videoEndTime.length === 4 ? `00${this.fetch.data.item.videoEndTime}` : this.fetch.data.item.videoEndTime,
              },
            },
          });
          this.setValidationsByItemType();
          this.createTextObserver();
        }
      });
    } else {
      this.form.setInitialValues({
        item: {
          text: '',
          ...defaultGrammar && {
            grammar: {
              id: defaultGrammar,
            },
          },
        },
      });
      setTimeout(() => { this.createTextObserver(); }, 250);
    }
    this.form.reset();
    this.itemId = itemId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const itemId = this.form.getValue('item.id');
    this.submit.fetch({
      method: itemId ? 'put' : 'post',
      url: itemId ? `/${this.endpointUrl}/${itemId}` : `/${this.endpointUrl}`,
      body: {
        item: {
          ...this.form.getValue('item'),
          type: this.form.getValue('item.type').id,
          grammar: this.form.getValue('item.grammar').id,
          reference: this.form.getValue('item.reference') && this.form.getValue('item.reference').length > 0 ? this.form.getValue('item.reference') : null,
          text: this.form.getValue('item.text') && this.form.getValue('item.text').length > 0 ? this.form.getValue('item.text').trim() : undefined,
        },
        order: this.form.getValue('order') || this.order,
        group: this.form.getValue('group') || 1,
      },
    }).then(() => {
      if (this.submit.data) {
        this.onSaveSuccess();
        NotificationService.addNotification(
          `Item ${itemId ? 'updated' : 'created'} successfully.`,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${itemId ? 'updating' : 'creating'} item.`,
          'error',
        );
      }
    });
  });
}
