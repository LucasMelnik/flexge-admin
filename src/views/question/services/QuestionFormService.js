import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, minLength } from '../../../core/validations';

class QuestionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  defaultValidations = {
    text: [isRequired],
    translation: [isRequired],
    type: [isRequired],
    group: [isRequired],
    grammar: [isRequired],
  };

  constructor() {
    extendObservable(this, {
      questionId: null,
      successCallback: null,
      unitId: null,
    });
    this.form.validations = {
      ...this.defaultValidations,
    };
  }

  setValidationsByQuestionType = action(() => {

    switch (this.form.getValue('type').key) {
      case 'DICTATION':
        this.form.validations = {
          ...this.defaultValidations,
          answers: [isRequired, minLength(1)],
        };
        break;
      case 'GAP_FILL':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(1)],
          answers: [isRequired, minLength(4)],
        };
        break;
      case 'GRAMMAR':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(1)],
        };
        break;
      case 'MOVIE':
        this.form.validations = {
          ...this.defaultValidations,
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'MULTIPLE_COMPLETE_PHRASE':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(2)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'UNSCRAMBLE_PHRASE_DRAG_AND_DROP':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(2)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'UNSCRAMBLE_PHRASE_SR':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(2)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'MUSIC_VIDEO':
        this.form.validations = {
          ...this.defaultValidations,
          indexesToRemove: [isRequired, minLength(5)],
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

  init = action((unitId, successCallback) => {
    this.unitId = unitId;
    this.form.setInitialValues({ unit: unitId });
    this.form.reset();
    this.successCallback = successCallback;
  });

  handleLoad = action((questionId) => {
    if (questionId) {
      this.fetch.fetch({
        url: `/questions/${questionId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({ unit: this.unitId });
    }
    this.form.reset();
    this.questionId = questionId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      console.log(this.form.errors)
      return;
    }
    const questionId = this.form.getValue('id');
    this.submit.fetch({
      method: questionId ? 'put' : 'post',
      url: questionId ? `/questions/${questionId}` : '/questions',
      body: {
        ...this.form.getValues(),
        type: this.form.getValue('type').id,
        grammar: this.form.getValue('grammar').id,
      },
    }).then(() => {
      if (this.submit.data) {
        if (this.successCallback) {
          this.successCallback();
        } else {
          const question = this.submit.data;
          browserHistory.push(`/questions/${question.id}`);
          this.questionId = question.id;
          this.form.reset();
          this.form.setInitialValues(question);
        }
        NotificationService.addNotification(
          `Question ${questionId ? 'updated' : 'created'} successfully.`,
          null,
          null,
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${questionId ? 'updating' : 'creating'} question.`,
          null,
          null,
          'danger',
        );
      }
    });
  })
}

const questionFormService = new QuestionFormService();

export default questionFormService;
