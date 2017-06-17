import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, minLength } from '../../../core/validations';

class QuestionFormService {
  fetch = new FetchService()
  submit = new FetchService()
  form = new FormService()

  constructor() {
    extendObservable(this, {
      questionId: null,
    });
    this.form.validations = {
      text: [isRequired],
      translation: [isRequired],
      type: [isRequired],
    };
  }

  setValidationsByQuestionType = action(() => {
    const defaultValidations = {
      text: [isRequired],
      translation: [isRequired],
      type: [isRequired],
    };

    switch (this.form.getValue('type').key) {
      case 'DICTATION':
        this.form.validations = {
          ...defaultValidations,
          answers: [isRequired, minLength(1)],
        };
        break;
      case 'GAP_FILL':
        this.form.validations = {
          ...defaultValidations,
          indexesToRemove: [isRequired, minLength(1)],
          answers: [isRequired, minLength(4)],
        };
        break;
      case 'GRAMMAR':
        this.form.validations = {
          ...defaultValidations,
          indexesToRemove: [isRequired, minLength(1)],
        };
        break;
      case 'MOVIE':
        this.form.validations = {
          ...defaultValidations,
          answers: [isRequired, minLength(3)],
        };
      case 'MULTIPLE_COMPLETE_PHRASE':
      case 'UNSCRAMBLE_PHRASE_DRAG_AND_DROP':
      case 'UNSCRAMBLE_PHRASE_SR':
        this.form.validations = {
          ...defaultValidations,
          indexesToRemove: [isRequired, minLength(2)],
          answers: [isRequired, minLength(3)],
        };
        break;
      case 'MUSIC_VIDEO':
        this.form.validations = {
          ...defaultValidations,
          indexesToRemove: [isRequired, minLength(5)],
        };
        break;
      default:
        break;
    }
    this.form.setInitialValues({
      id: this.form.getValue('id'),
      type: this.form.getValue('type'),
    });
    this.form.reset();
  });

  handleLoad = action((questionId) => {
    this.form.reset();
    if (questionId) {
      this.fetch.fetch({
        url: `/questions/${questionId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.questionId = questionId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    const questionId = this.form.getValue('id');
    this.submit.fetch({
      method: questionId ? 'put' : 'post',
      url: questionId ? `/questions/${questionId}` : '/questions',
      body: this.form.getValues(),
    }).then(() => {
      if (this.submit.data) {
        const question = this.submit.data;
        browserHistory.push(`/questions/${question.id}`);
        this.questionId = question.id;
        this.form.reset();
        this.form.setInitialValues(question);
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
